# Shortstack App

Shortstack is a url shortener that is built using Node.js, TypeScript, GraphQL and is deployed on AWS infrastructure.

## System Design

![Image](https://github.com/user-attachments/assets/4942edb8-2038-4585-ba06-fd169b93dc1c)

* Shortstack app hosts a web server on EC2. Using security groups and NACLs, we are tightening security over the instance.
* The API is protected by the API gateway and uses a custom domain which was registered via AWS ACM and is owned privately by myself. I subdomained it for this project.
* The API gateway routes to a Lambda function to ensure that our API is only running when needed.
* Our Lambda function uses DynamoDB to store the mapping from short to long URLs
* IAM Roles allow the lambda function to connect to our DynamoDB instance with limited permissions
* CloudWatch logs ensures we have logs for our lambda instance

## Overview

- [Shortstack app](https://github.com/HenryGann/shortstack) is built using NodeJS, NextJS, TypeScript, Apollo GraphQL Client and Tailwind.
- [Shortstack api](https://github.com/HenryGann/shortstack-api) is built using NodeJS, Apollo GraphQL Server, TypeScript, DynamoDB client and deployed on AWS Lambda using the serverless framework 

Below are some pictures demonstrating the app in action:

![Image](https://github.com/user-attachments/assets/9a7774b7-dac5-4748-86ee-125e856abd7c)
![Image](https://github.com/user-attachments/assets/a75bb763-d7cd-49af-91ec-968d4749141d)

And here is a demonstration of the Apollo Server running on Lambda:

![Image](https://github.com/user-attachments/assets/b1d5b54e-8caf-4623-bc51-6c8a8f95b702)

## How to run

These projects are built on Node 22.14.0

They can be run through the following:

```bash
npm i
npm run dev # For development mode
npm run build # For creating a build
npm run start # Running production build
```

## Deployment
The API is deployed to Lambda using serverless
```bash
npm i -g serverless
serverless deploy
```

## Future improvements
* Adding redis to improve performance
* Checking for pre-existing urls to reduce wasted space in DynamoDB
* Setting up CI/CD pipelines for automated deployment