import boto3
import json
from collections import defaultdict
import argparse

def get_s3_folder_sizes(bucket_name, output_file='s3_folder_sizes.json'):
    """
    Lists all folders in an S3 bucket along with their sizes in MB.
    Writes the results to a JSON file.
    
    Args:
        bucket_name (str): Name of the S3 bucket
        output_file (str): Path to the output JSON file
    """
    # Initialize boto3 client
    s3_client = boto3.client('s3')
    
    # Dictionary to store folder sizes
    folder_sizes = defaultdict(int)
    
    # Paginator for handling large buckets
    paginator = s3_client.get_paginator('list_objects_v2')
    
    # Iterate through all objects in the bucket
    print(f"Scanning objects in bucket '{bucket_name}'...")
    for page in paginator.paginate(Bucket=bucket_name):
        if 'Contents' in page:
            for obj in page['Contents']:
                key = obj['Key']
                size = obj['Size']
                
                # Extract folder path
                if '/' in key:
                    # Get all parent folders
                    parts = key.split('/')
                    for i in range(len(parts)):
                        if i < len(parts) - 1:  # Skip the file itself
                            folder_path = '/'.join(parts[:i+1]) + '/'
                            folder_sizes[folder_path] += size
                
    # Convert bytes to MB and prepare results
    result = {}
    for folder, size_bytes in folder_sizes.items():
        size_mb = size_bytes / (1024 * 1024)  # Convert bytes to MB
        result[folder] = round(size_mb, 2)  # Round to 2 decimal places
    
    # Sort folders by size (largest first)
    sorted_result = dict(sorted(result.items(), key=lambda item: item[1], reverse=True))
    
    # Write results to JSON file
    with open(output_file, 'w') as f:
        json.dump(sorted_result, f, indent=4)
    
    print(f"Found {len(sorted_result)} folders.")
    print(f"Results written to {output_file}")
    
    return sorted_result

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Calculate S3 folder sizes in MB')
    parser.add_argument('bucket_name', help='Name of the S3 bucket')
    parser.add_argument('--output', '-o', default='s3_folder_sizes.json', 
                        help='Output JSON file path (default: s3_folder_sizes.json)')
    
    args = parser.parse_args()
    
    get_s3_folder_sizes(args.bucket_name, args.output)
