#!/bin/bash

minikube start
minikube addons enable ingress
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=`cat /proc/sys/kernel/random/uuid`
