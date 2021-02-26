#!/bin/bash

echo "Building image"
docker login -u tarcisioangelo -p T@r03240607
docker build -t tarcisioangelo/autoclubes:srv-admin-latest -f docker/prod.Dockerfile .
docker tag tarcisioangelo/autoclubes:srv-admin-latest tarcisioangelo/autoclubes:srv-admin-latest
docker push tarcisioangelo/autoclubes:srv-admin-latest

echo "Deploy for Production"
ssh 34.70.174.174 -p 22 -l root << EOF
docker login -u tarcisioangelo -p T@r03240607
docker pull tarcisioangelo/autoclubes:srv-admin-latest
docker-compose up -d
docker system prune --force
EOF

echo "Deploy finish"



# /var/lib/docker/volumes/root_ac-images-storage/_data

# docker build -t local/srv-admin -f docker/prod.Dockerfile .