import * as chalk from 'chalk'
import { env, ILogger, LOGLEVELS, LOGLEVEL_NUMERIC } from '../'

export const DASH_LINE = `_______________________________________________________________________________________________`

/* tslint:disable:no-console */
const fatal = (...args: any[]) => {
  const chalkedArgs: any[] = []
  args.forEach((arg: any) => {
    if (typeof arg === 'string') {
      chalkedArgs.push(chalk.red(arg))
    } else {
      chalkedArgs.push(chalk.red(JSON.stringify(arg)))
    }
  })
  console.log(...chalkedArgs)
}

const error = (...args: any[]) => {
  const currentLoglevel: number = LOGLEVEL_NUMERIC[env.APP_LOGLEVEL!]
  if (currentLoglevel >= LOGLEVEL_NUMERIC[LOGLEVELS.ERROR]) {
    const chalkedArgs: any[] = []
    args.forEach((arg: any) => {
      if (typeof arg === 'string') {
        chalkedArgs.push(chalk.yellow(arg))
      } else {
        chalkedArgs.push(chalk.yellow(JSON.stringify(arg)))
      }
    })
    console.log(...chalkedArgs)
  }
}

const note = (...args: any[]) => {
  const currentLoglevel: number = LOGLEVEL_NUMERIC[env.APP_LOGLEVEL!]
  if (currentLoglevel >= LOGLEVEL_NUMERIC[LOGLEVELS.NOTE]) {
    const chalkedArgs: any[] = []
    args.forEach((arg: any) => {
      if (typeof arg === 'string') {
        chalkedArgs.push(chalk.blue(arg))
      } else {
        chalkedArgs.push(chalk.blue(JSON.stringify(arg)))
      }
    })
    console.log(...chalkedArgs)
  }
}

const dev = (...args: any[]) => {
  const currentLoglevel: number = LOGLEVEL_NUMERIC[env.APP_LOGLEVEL!]
  if (currentLoglevel >= LOGLEVEL_NUMERIC[LOGLEVELS.DEV_NOTE]) {
    const chalkedArgs: any[] = []
    args.forEach((arg: any) => {
      if (typeof arg === 'string') {
        chalkedArgs.push(chalk.green(arg))
      } else {
        chalkedArgs.push(arg)
      }
    })
    console.log(...chalkedArgs)
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
