#Dockerfile v0.1
#purpose: to execute all options available on Dockerfile

FROM centos:latest

LABEL maintainer="www.docker.com/r/surval"

RUN yum update -y &&	\
    yum install httpd && \
    yum install net-tools && \
    yum install epel-release

CMD echo "Verify the IP Address of the container"

ENV ENVIRONMENT="production"

EXPOSE 80

ENTRYPOINT apachectl "-DFOREGROUND"
