#!/usr/bin/env bash

docker build -t spark-etl-sample .

kubectl deploy -f k8-dev.yaml
