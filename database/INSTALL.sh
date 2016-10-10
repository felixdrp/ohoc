#!/bin/bash

# Install the Dev Database in a docker image.
#sudo docker build --pull=true -t debian:latest .
#ahi queda eso.
sudo docker pull postgres
# sudo docker rm kentpg
# Create the container
sudo docker run \
  -v $(pwd)/data:/var/lib/postgresql/data \
  --name kentpg \
  -e POSTGRES_PASSWORD=qwerty1234 -d -p 5432:5432 postgres
