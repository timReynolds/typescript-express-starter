Typescript Express Starter
=========================

[![devDependency Status](https://david-dm.org/timreynolds/typescript-express-starter/dev-status.svg)](https://david-dm.org/timreynolds/typescript-express-starter#info=devDependencies)
[![Build Status](https://travis-ci.org/timReynolds/typescript-express-starter.svg?branch=master)](https://travis-ci.org/timReynolds/typescript-express-starter)
[![Maintainability](https://api.codeclimate.com/v1/badges/99ef9fd41a78d421248e/maintainability)](https://codeclimate.com/github/timReynolds/typescript-express-starter/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/99ef9fd41a78d421248e/test_coverage)](https://codeclimate.com/github/timReynolds/typescript-express-starter/test_coverage)

Extracted basic TypeScript Express server setup I use for most server projects. 

## Setup Features

* TS to JS complication
* Testing via [Jest](https://github.com/facebook/jest), includes coverage
* [TSLint](https://palantir.github.io/tslint/)
* [Prettier](https://github.com/prettier/prettier), performed automatically on commit
* Pre hooks
* Ignore files to ensure minimal code is stored/shipped
* Helpful badges
* Travis setup
* Hermetically sealed tests in alpine

## Server Setup

* Status endpoints
* Prom metrics via tricorder
* Production ready DockerFile
* Graceful shutdown