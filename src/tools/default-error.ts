import { IError } from '../'
import { logger } from './'

export const APP_ERROR: string = 'APP ERROR'
export const OPERATIONAL_PREFIX: string = 'OPERATIONAL ERROR: '
export const FATAL_PREFIX: string = 'FATAL ERROR: '
export const DEFAULT_ERROR_MESSAGE = 'unknown error'

/**
 * Centralized unique error type
 */
export class AppError extends Error {
  public readonly type: string = APP_ERROR
  public readonly details: any

  /**
   * @param message string optional
   * @param details any details
   */
  constructor(message?: string, ...details: any[]) {
    super(message || DEFAULT_ERROR_MESSAGE)
    this.details = details
  }
}

/**
 * creates the error (same as new Error(...))
 * @param message string optional
 * @param details any details
 */
const is = (message?: string, ...details: any[]): AppError => {
  if (!message) {
    return new AppError()
  } else {
    return new AppError(message, ...details)
  }
}

/**
 * print error to console
 * @param  message the text message of the error OR the generated error itself (Error or AppError)
 * @param  ...details any number of objects to include with the error
 */
const op = (messageOrError?: string | Error, ...details: any[]): AppError => {
  let appError: AppError
  let includePrefix: boolean = false
  if (!messageOrError) {
    appError = is(OPERATIONAL_PREFIX + DEFAULT_ERROR_MESSAGE)
  } else if (typeof messageOrError === 'string') {
    appError = is(OPERATIONAL_PREFIX + messageOrError, ...details)
  } else if (messageOrError instanceof AppError) {
    includePrefix = true
    appError = messageOrError
  } else {
    const basicMessage: string = messageOrError.message || DEFAULT_ERROR_MESSAGE
    const message: string = OPERATIONAL_PREFIX + basicMessage
    appError = { ...messageOrError, message, details, type: APP_ERROR }
  }

  const messageToShow = (includePrefix ? OPERATIONAL_PREFIX : '') + appError.message
  logger.error(messageToShow)
  details.forEach((detail: any) => {
    logger.error(detail)
  })
  return appError
}

/**
 * print a fatal error to console and terminates the application
 * @param  message the text message of the error OR the generated error itself (Error or AppError)
 * @param  ...details any number of objects to include with the error
 */
const fatal = (
  messageOrError?: string | Error,
  ...details: any[]
): AppError => {
  let appError: AppError
  let includePrefix: boolean = false
  if (!messageOrError) {
    appError = is(FATAL_PREFIX + DEFAULT_ERROR_MESSAGE)
  } else if (typeof messageOrError === 'string') {
    appError = is(FATAL_PREFIX + messageOrError, ...details)
  } else if (messageOrError instanceof AppError) {
    includePrefix = true
    appError = messageOrError
  } else {
    const basicMessage: string = messageOrError.message || DEFAULT_ERROR_MESSAGE
    const message: string = FATAL_PREFIX + basicMessage
    appError = { ...messageOrError, message, details, type: APP_ERROR }
  }

  const messageToShow = (includePrefix ? FATAL_PREFIX : '') + appError.message
  logger.fatal(messageToShow)
  details.forEach((detail: any) => {
    logger.fatal(detail)
  })
  return appError
}

/**
 * shortcuts functions to make easy dealing with errors
 */
export const defaultError: IError = {
  fatal,
  is,
  op,
  /**
   * throw a new error with the message
   * @param  message can be a string or an instance of Error
   * @param  ...details any number of objects to include with the error
   */
  throw: (messageOrError?: string | Error, ...details: any[]) => {
    if (!messageOrError) {
      throw new AppError()
    } else if (typeof messageOrError === 'string') {
      throw new AppError(messageOrError, ...details)
    } else {
      throw messageOrError
    }
  },
}
