import boto3
import json

client = boto3.client('ses')

response = client.send_email(
    Source = "sender@gmail.com",
    Destination = {
        "ToAddresses": [
            "receiver@gmail.com"
        ]
    },
    Message={
        "Subject": {
            "Data": "Test Email-2"
        },
        "Body": {
            "Text": {
               "Data": "Test Email Body-2"
            }
        }
    }
)
print(response['ResponseMetadata']['HTTPStatusCode'])
