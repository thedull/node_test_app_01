# Node.js Demo App

Application to exemplify basic Node.js concepts.

Navigate through the different branches to see progressive enhancements.

## Initial Problem

Develop an app to get info and stats about Dogecoin  

## In this branch

* ~~Basic solution using `fs` and streams.~~

* ~~Code separation for sources, libraries, and final consumer using TypeScript. Added npm scripts.~~~

*  Moved local dependency to own Node project and published on local Verdaccio.

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
