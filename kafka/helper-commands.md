# Kafka Helper Commands

## Topics

> Kafka is installed on a 16.04 Ubuntu: /home/kafka/kafka/bin has the executables

* List all Kafka Topics in the Zookeeper cluster
  > /home/kafka/kafka/bin/kafka-topics --zookeeper 127.0.0.1:2181 --list

## Producer

* Read Data from a Kafka topic
  > /home/kafka/kafka/bin/kafka-topics --zookeeper 127.0.0.1:2181 --topic foobar

## Consumer
