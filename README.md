# Node.js Demo App

Application to exemplify basic Node.js concepts.

Navigate through the different branches to see progressive enhancements.

## Initial Problem

Develop an app to get info and stats about Dogecoin  

## In this branch

* ~~Basic solution using `fs` and streams.~~

* ~~Code separation for sources, libraries, and final consumer using TypeScript. Added npm scripts.~~

* ~~Move local dependency to own Node project and published on local Verdaccio.~~

* ~~Changes to package for local testing with `npm link` before publishing.~~

* ~~Converted to WebAPI and added Nodemon support.~~

* ~~Created basic HTTP client with axios.~~

* ~~Added basic authentication middleware with JWT.~~

* ~~Added helmet security and basic token invalidation logic through logout.~~

* ~~Added basic websocket server and client using socket.io.~~

* Added Docker support.

## To build and run the Docker image

IMPORTANT: Make sure that the name of the `dogeaverage` package published in Verdaccio corresponds to the one in the codebase. Otherwise, make them match.

1. Generate a read only token for the Verdaccio registry. You'll need to enter your credentials.

```bash
$ npm token create --read-only
```

2. Get the token and use it to build the image as build argument.

```bash
# Inside the root directory of the project
$ docker build --build-arg NPM_TOKEN="your token here" -t node_test_app_01 .
```

3. Create a container based on this image:

```bash
docker run -d --name node_test_app_01 -p 3000:3000 -p 3001:3001 node_test_app_01  
```

## To generate the definitions file

```bash
$ cd ./lib/dogeAverage
$ tsc ./dogeAverage.js --declaration --emitDeclarationOnly --allowJs --outDir types 
```

Add an entry to the corresponding `package.json` file:
```
{ ...
  "types": "types/dogeAverage.d.ts",
... }
```  

And add JSDoc comments inside the typings file.

## Setting up local Verdaccio registry

Using docker:

```bash
$ docker pull verdaccio/verdaccio
$ docker run -d --name verdaccio -p 4873:4873 verdaccio/verdaccio
$ npm adduser --registry http://localhost:4873/
```

Install `nrm` (https://github.com/Pana/nrm) globally
```bash
$ npm install -g nrm
$ nrm add verdaccio http://localhost:4873/
$ nrm use verdaccio
$ npm login # enter verdaccio's user credentials 
```
