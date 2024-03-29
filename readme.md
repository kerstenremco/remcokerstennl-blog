# www.remcokersten.nl source code

This is the source code of [www.remcokersten.nl](https://www.remcokersten.nl)
This repository has been made public to inspire other [Astro 🚀](https://github.com/withastro/astro) developers and AWS users.

## Vulnerability found?

Do you believe that there is a vulnerability in the source code? Please contact me!

# Frontend

## Development

1. Create .env file
2. Run `npm i`
3. Run `npm start start`

## Generate static version

1. Compile static website `npm run build`
2. Compiled files are located in _dist_

# Deployment

## Infrastructure

The infrastructure for frontend is hosted at AWS and managed by Terraform
Terrafrom state is local stored
`terraform apply -var-file="/Users/remcokersten/tf/remcokerstennl.tfvars"`

## CI/CD frontend

Deployment to AWS S3 can done with Github Actions

# CI/CD backend

Backend is build with AWS SAM
Build and deploy: `sam build && sam deploy`
