#!/bin/bash

for f in /app/go/*;
        do
                [ -d $f ] && cd "$f" && echo Recycling Space on $f      \
                                     && echo "Deleting the log files on the agent"      \
                                     && \rm -rf go-agent.log*   \
                                     && echo "Cleaning up pipelines less than 10 days from current-date"        \
                                     && cd pipelines    \
                                     && PIPELINE_COUNT=$(ls -ltr|wc -l) \
                                     && curl -X POST -H 'Content-type:application/json' --data '{"text":"> Total Number of pipelines on '"$f"' before cleanup are: '"$PIPELINE_COUNT"'"}' https://hooks.slack.com/services/T024yVU91V/eB6UQY6F6Y/xQRn12ioAcUJExAvk9WraW0c \
                                     && find . -mtime +5 -exec rm -rf {} \;     \
                                     && PIPELINE_COUNT=$(ls -ltr|wc -l) \
                                     && curl -X POST -H 'Content-type:application/json' --data '{"text":"> Total Number of pipelines on '"$f"' after cleanup are: '"$PIPELINE_COUNT"'"}' https://hooks.slack.com/services/T024VryU91Ve/B6UQY6F6Y/xQRn12ioAcUJExAvk9WraW0c  \
                                     && FREE_SPACE=$(df -Ph .)  \
                                     && curl -X POST -H 'Content-type:application/json' --data '{"text":"> Free Disk Space on negocd: '"$FREE_SPACE"'"}' https://hooks.slack.com/services/T024VU91V/B6UQrY6Fe6Y/xQRn12ioAcbUJExAvk9WraW0c
        done;
