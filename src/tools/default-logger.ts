import chalk from 'chalk'
import { env, ILogger, LOGLEVEL_NUMERIC, LOGLEVELS } from '../'

export const DASH_LINE = `_______________________________________________________________________________________________`

/* tslint:disable:no-console */
const fatal = (...args: any[]) => {
  console.log(chalk.red(...args))
}

const error = (...args: any[]) => {
  const currentLoglevel: number = LOGLEVEL_NUMERIC[env.APP_LOGLEVEL!]
  if (currentLoglevel >= LOGLEVEL_NUMERIC[LOGLEVELS.ERROR]) {
    console.log(chalk.yellow(...args))
  }
}

const note = (...args: any[]) => {
  const currentLoglevel: number = LOGLEVEL_NUMERIC[env.APP_LOGLEVEL!]
  if (currentLoglevel >= LOGLEVEL_NUMERIC[LOGLEVELS.NOTE]) {
    console.log(chalk.blue(...args))
  }
}

const dev = (...args: any[]) => {
  const currentLoglevel: number = LOGLEVEL_NUMERIC[env.APP_LOGLEVEL!]
  if (currentLoglevel >= LOGLEVEL_NUMERIC[LOGLEVELS.DEV_NOTE]) {
    console.log(...args)
  }
}

const dash = () => {
  console.log(chalk.magentaBright(DASH_LINE))
}

export const defaultLogger: ILogger = {
  dash,
  dev,
  error,
  fatal,
  note,
}
