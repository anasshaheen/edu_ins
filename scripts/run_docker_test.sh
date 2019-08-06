#!/bin/bash
docker-compose -f ../docker/docker-compose.yml -f ../docker/docker-compose.test.yml build
docker-compose -f ../docker/docker-compose.yml -f ../docker/docker-compose.test.yml up