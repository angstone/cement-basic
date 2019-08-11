import { ILogger } from '../'
import { defaultLogger } from './default-logger'

interface ILoggerState {
  logger: ILogger
}

interface ILoggerModule extends ILogger {
  useLogger: (logger: ILogger) => void
}

export const state: ILoggerState = {
  logger: defaultLogger,
}

/* tslint:disable:no-shadowed-variable */
const useLogger = (logger: ILogger) => {
  state.logger = logger
}

const fatal = (...args: any[]) => {
  state.logger.fatal(...args)
}
const error = (...args: any[]) => {
  state.logger.error(...args)
}
const note = (...args: any[]) => {
  state.logger.note(...args)
}
const dev = (...args: any[]) => {
  state.logger.dev(...args)
}

const dash = () => {
  state.logger.dash()
}

export const logger: ILoggerModule = {
  dash,
  dev,
  error,
  fatal,
  note,
  useLogger,
}
