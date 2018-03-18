#!/bin/bash
echo "Starting Backup on: " $(date)
curl 'http://negocd-wc-1p:8153/go/api/backups' -u '' -H 'Confirm: true' -H 'Accept: application/vnd.go.cd.v1+json' -X POST > backup_result.json

if [ $? -eq 0 ]
then
        echo "BackUp Finished Successfully!"

        cat /var/go/backup_workspace/backup_result.json
        echo "Backup_Result.json has been created"

        cd /var/go/gocd-config

        echo "Copying the file from backup location"
        cp -R $(cat /var/go/backup_workspace/backup_result.json | jq -r '.path') /var/go/gocd-config/negocd-wc-1p-backup

        echo "Copy Finished, Uploading to Git"
        cd /var/go/gocd-config

        git pull

        git add --all .

        git commit -m "Bi-Weekly Backup on '$(date)'"

        git push

        echo "Cleaning Up the backup at: "$(cat /var/go/backup_workspace/backup_result.json | jq -r '.path')

        rm -rf $(cat /var/go/backup_workspace/backup_result.json | jq -r '.path')
else
        echo "BackUp Failed"
fi
