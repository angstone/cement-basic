import { logger } from './logger'

export const JOBTEST_ERROR: string = 'JOBTEST ERROR'
export const OPERATIONAL_PREFIX: string = 'OPERATIONAL ERROR: '
export const FATAL_PREFIX: string = 'FATAL ERROR: '
export const DEFAULT_ERROR_MESSAGE = 'unknown error'

/**
 * Centralized unique error type
 */
export class JobtestError extends Error {
    public readonly type: string = JOBTEST_ERROR
    public readonly details: any[]

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
 * shortcuts functions to make easy dealing with errors
 */
export const error = {
    /**
     * creates the error (same as new Error(...))
     * @param message string optional
     * @param details any details
     */
    is(message?: string, ...details: any[] | any): JobtestError {
        if (!message) {
            return new JobtestError()
        } else {
            return new JobtestError(message, ...details)
        }
    },

    /**
     * print error to console
     * @param  message the text message of the error OR the generated error itself (Error or JobtestError)
     * @param  ...details any number of objects to include with the error
     */
    op(message?: string | Error, ...details: any[]) {
        if (!message) {
            logger.warn(OPERATIONAL_PREFIX + DEFAULT_ERROR_MESSAGE)
        } else if (typeof message === 'string') {
            logger.warn(OPERATIONAL_PREFIX + error.is(message).message)
        } else if (message instanceof JobtestError) {
            logger.warn(
                OPERATIONAL_PREFIX + (message.message || DEFAULT_ERROR_MESSAGE)
            )
            message.details.forEach(detail => {
                logger.warn(detail)
            })
        } else {
            logger.warn(
                OPERATIONAL_PREFIX + (message.message || DEFAULT_ERROR_MESSAGE)
            )
        }

        details.forEach(detail => {
            logger.warn(detail)
        })
    },

    /**
     * print a fatal error to console and terminates the application
     * @param  message the text message of the error OR the generated error itself (Error or JobtestError)
     * @param  ...details any number of objects to include with the error
     */
    fatal(message?: string | Error, ...details: any[]): any {
        if (!message) {
            logger.error(FATAL_PREFIX + DEFAULT_ERROR_MESSAGE)
        } else if (typeof message === 'string') {
            logger.error(FATAL_PREFIX + error.is(message).message)
        } else if (message instanceof JobtestError) {
            logger.error(
                FATAL_PREFIX + (message.message || DEFAULT_ERROR_MESSAGE)
            )
            message.details.forEach(detail => {
                logger.error(detail)
            })
        } else {
            logger.error(
                FATAL_PREFIX + (message.message || DEFAULT_ERROR_MESSAGE)
            )
        }

        details.forEach(detail => {
            logger.error(detail)
        })

        // It should terminate the application to avoid unpredicted states
        // try it gracefully
        if (process.env.JOBTEST_ENV !== 'dev') {
            process.exit(1)
        } else {
            return message
        }
    },

    /**
     * throw a new error with the message
     * @param  message can be a string or an instance of Error
     * @param  ...details any number of objects to include with the error
     */
    throw(message?: string | Error, ...details: any[] | any) {
        if (!message) {
            throw new JobtestError()
        } else if (typeof message === 'string') {
            throw new JobtestError(message, ...details)
        } else {
            throw message
        }
    },

    throwJobtestError(...args: any | any[]) {
        throw error.is(...args)
    },
}
