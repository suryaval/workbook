# Apache Kafka Installation Guide

Prerequisites:
1. Wget
2. Tar

> Download Kafka from the following link:

`https://www.apache.org/dyn/closer.cgi?path=/kafka/0.11.0.1/kafka-0.11.0.1-src.tgz`

or

`wget http://apache.mivzakim.net/kafka/0.8.2.0/kafka_2.10-0.8.2.0.tgz`

> Now untar the downloaded package:

`tar -zxvf <kafka>.tgz`

> Start the zookeeper server:

`bin/zookeeper-server-start.sh config/zookeeper.properties`

> Start the Kafka server:

`bin/kafka-server-start.sh config/server.properties`

> Publish first message:

`echo "First Topic - First Message" | ~/<Kafka_Folder>/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic FirstTopic > /dev/null`

> Consume first message:

`~/<Kafka_Folder>/bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic FirstTopic --from-beginning`

> To view the messages in a fancy GUI, Download kafka tool from:

`http://www.kafkatool.com/download.html`

> I am using CentOS7 so the download gave install script(.sh) file.
After the install script is run, kafka tool will be up and running.

```
1. Click on the cluster >> Add Cluster
2. Give cluster name as localhost:9092
3. zookeeper host as localhost
4. zookeeper port as 2181
5. By Default, the messages will be in the form of byte array. Dont forget to change the type to string. Change it in the properties tab.
6. Go to Data tab, click on Run button. You will see the messages.
```
