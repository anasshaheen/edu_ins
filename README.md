# SIMPLE APP FOR EDU INSTITUTIONS MANAGEMENT

---

This application is meant to manage the entities of a small education instutions from teachers to courses and students.

## Usage

First there's a few dependencies needed to be installed to run the application:

- NodeJS & NPM/Yarn
- MongoDB
- Redis

or you can use Docker and Docker-Compose to run the application and in this case you just need Docker to be installed.

To Run the application without docker:

```bash
> yarn install # install dependencies.
> yarn build # to build the application.
> yarn start # to run the application in prod mode
> yarn start:dev # run in dev mode
```

To run the test suitcase:

```bash

> yarn test
```

To run the application using docker there's a set of scripts in scripts folder to run the application accross the different envirements:

- to run in dev mode:

```bash
> cd ./scripts && ./run_docker_dev.sh
```

- to run in test mode:

```bash
> cd ./scripts && ./run_docker_test.sh
```

- to run in production mode which will use Nginx as a reverse proxy and will accept the requests on 'http://serverurl:80/graphql':

```bash
> cd ./scripts && ./run_docker_prod.sh
```
