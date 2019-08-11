
# The Cement Basic Module

contains:
- env
- logger (with chalk)
- error (good dealer)
- signature

# install
```
npm install @cement/basic
```
# use
```
import {
  signature,
  logger,
  error,
  ENVS,
  LOGLEVELS
} from '@cement/basic'

// Set environment variables

process.env.APP_ENV = ENVS.DEV // or ENVS.PROD
process.env.APP_LOGLEVEL = LOGLEVELS.DEV_NOTE // or other

// call your app signature
signature()

// be happy and enjoy! :)

logger.note('This app is amazing, lets code it!')
logger.dev('That is the result of the date.now(): ', Date.now())
logger.fatal('This is very bad! :(')
logger.error('This is a expected common error :/')

let myError: Error
myError = error.is(
  'this specific one error',
  'and contains',
  { several: 'details' }
)
// it uses new Error(..) internally

error.op('operational expected error') // prints if LOGLEVELS allows
error.op(new Error())
error.op(myError)

/*
* terminates the application if APP_ENV is set to
* ENVS.PROD ('prod')
*/
error.fatal('really bad error')
error.fatal(new Error())
error.fatal(myError)

error.throw('Error that I wont deal with now, but upstairs in code')
error.throw(new Error('any type that extends Error'))
error.throw(myError)

// Practical sample:

logger.note('Doing Stuff')
await someNiceAndCleanAsyncTask.catch(error.throw)
await otherGoodTask.catch(error.op) // that doesn't matter a lot
logger.dev('Hey devs, pay attention on this task:')
await importantTask.catch(error.fatal) // a failure here restart app
```
## env

The env define default environment variables.

Always use ``process.env.APP_{YOUR ENV VARIABLE}``

Exports ``process.env`` as ``env``

## logger

The logger wraps your way of handling your logs.
Exposes 4 functions from interface ``ILogger``.
Comes with a default implementation called ``defaultLogger``
witch just prints in the console.
- ``fatal(...any)``: for red fatal errors
- ``error(...any)``: for yellow operational errors
- ``note(...any)``: for blue execution notes
- ``dev(...any)``: for bright purple dev notes

Each ones prints the console only if the ``APP_LOGLEVEL`` environment variable allows your kind.
They are:

``LOGLELEVELS.FATAL``
``LOGLELEVELS.ERROR``
``LOGLELEVELS.NOTE``
``LOGLELEVELS.DEV_NOTE``

exports the default implementation and the function ``useLogger`` to setup yours

## error

The error wraps your way of handling your errors.
Exposes 4 functions from interface ``IError``.

Comes with a default implementation called ``defaultError``
witch just log errors and also (gracefully?) stops application in case of fatal error.

- ``is(message, details)``: create a default AppError
- ``op(message|Error, details)``: handle operational error
- ``fatal(message|Error, details)``: handle fatal error
also (gracefully?) stops application if ``APP_ENV`` is set to ``ENVS.PROD``
- ``throw(message|Error, details)``: throw an error upstairs in code

They use ``logger.fatal`` for fatal and ``logger.error`` for operational

exports the default implementation and the function ``useError`` to setup yours

## signature
You use this by importing and running the ``signature()`` function in the beginning of your code, after setup of you environment variables.

It prints a friendly review of your package.json and register the environment variable ``APP_LOADED_AT`` in milliseconds.

You NEED this to make sure ``env``, ``logger``, and ``error`` modules are going to work as default expected.

## Indeed, THIS IS A BOILERPLATE, that is also a real-world-case-in-use-by-me-right-now useful npm module.

# Act as TypeScript Node Boilerplate for cement framework

Features:

- tslint
- prettier
- tslint-config-prettier
- typescript
- ts-node
- nodemon
- mocha
- chai
- chai-like
- chai-things
- sinon
- sinon-chai
- nyc (coverage)
- source-map-support (for use with coverage)
- supertest
- request
- request-promise-native
- express
- cors
- wallaby
- cron
- chalk
- Docker's Composition
