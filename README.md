# Next.K8S Boilerplate

> Kubernetes + Next.js Microservice Boilerplate

---

This project was built using [Stephen Grider's course](https://www.udemy.com/course/microservices-with-node-js-and-react/) as a guideline.

It has been modernized and refactored to my own personal styling/organizational choices.

**It's recommended to use [pnpm](https://pnpm.io) for package management and running scripts.**

The repository is managed with [Lerna](https://lerna.js.org) and enhanced with [NX](https://nx.dev/getting-started/intro).

- [Next.K8S Boilerplate](#nextk8s-boilerplate)
  - [Scripts](#scripts)
  - [Requirements](#requirements)
  - [Notable files](#notable-files)
  - [Debugging](#debugging)

---

## Scripts

To see all available scripts, type `pnpm scripts`

- `pnpm setup:minikube`: startup or create a minikube cluster
- `pnpm setup:secrets`: setup environment secrets
- `pnpm start`: start the Skaffold development environment
- `pnpm build`: build all packages (concurrency 6)
- `pnpm test`: test all packages
- `pnpm pods`: show current Kubernetes pods
- `pnpm pods:ingress`: show the ingress-nginx pod
- `pnpm graph`: view the NX project graph
- `pnpm version:[inc]`: increment version number; [inc] = major, minor, or patch
- `pnpm commit:quick`: for easy testing, perform a commit with generic message
- `pnpm publish:quick`: for easy testing, commit, patch, and publish all packages
- `pnpm docker:build`: build the docker images for all packages
- `pnpm docker:push`: push the docker images for all packages

## Requirements

- Kubernetes cluster running with ingress-nginx
  - With minikube, use `pnpm setup:minikube` and `pnpm setup:secrets` scripts
- Hostfile mapping from skaffold.local to cluster IP
  - Alternatively, update domain name in configuration

## Notable files

- [package.json](package.json)
- [skaffold.yaml](skaffold.yaml)
- [packages/*](packages)
  - Microservice source files
- [infra/*](infra)
  - Kubernetes configuration

## Debugging

Tests can be debugged using the Visual Studio Code debugger, and can be run from the workspace with the included `launch.json`, which should be updated to match modifications to the project.
