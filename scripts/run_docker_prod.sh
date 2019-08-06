#!/bin/bash
docker-compose -f ../docker/docker-compose.yml -f ../docker/docker-compose.prod.yml build
docker-compose -f ../docker/docker-compose.yml -f ../docker/docker-compose.prod.yml up