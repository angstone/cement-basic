import { ENVS, LOGLEVELS } from './'

/* tslint:disable:no-var-requires */
const app = require(process.env.PWD + '/package.json')

process.env.APP_NAME = '' + (app.name || 'Unamed App')
process.env.APP_AUTHOR = '' + (app.author || 'Unknown Author')
process.env.APP_DESCRIPTION =
  '' + (app.description || 'no description provided')
process.env.APP_LICENSE = '' + (app.license || 'no license info provided')
process.env.APP_VERSION = '' + app.version
process.env.APP_LOADED_AT = '' + Date.now()

// Defaults env to prod for security reasons
if (process.env.APP_ENV === undefined) {
  process.env.APP_ENV = ENVS.PROD
}

// Defaults loglevel to error
if (process.env.APP_LOGLEVEL === undefined) {
  process.env.APP_LOGLEVEL = LOGLEVELS.NOTE
}

const env = process.env

export { env }
