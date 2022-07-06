# Next.K8S Boilerplate

This project was built using [Stephen Grider's course](https://www.udemy.com/course/microservices-with-node-js-and-react/) as a guideline.

It has been modernized and modified to follow newer practices and my own personal styling/organizational choices.

It's recommended to use [pnpm](https://pnpm.io) for package management.

Requirements:

- Kubernetes cluster running with ingress-nginx
- Hostfile mapping from skaffold.local to cluster IP
  - Alternatively, update domain name in configuration

Notable Files:

- [package.json](package.json)
- [skaffold.yaml](skaffold.yaml)
- [packages/](packages)
