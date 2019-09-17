import { IError } from '../'
import { defaultError } from './default-error'

interface IErrorModule extends IError {
  useError: (error: IError) => void
  getErrorHandler: () => IError
}

interface IErrorState {
  error: IError
}

export const state: IErrorState = {
  error: defaultError,
}

/* tslint:disable:no-shadowed-variable */
const useError = (error: IError) => {
  state.error = error
}

const getErrorHandler = (): IError => {
  return state.error
}

const is = (message?: string, ...details: any[]): Error => {
  return state.error.is(message, ...details)
}
const op = (message?: string | Error, ...details: any[]): Error => {
  return state.error.op(message, ...details)
}
const fatal = (message?: string | Error, ...details: any[]): Error => {
  return state.error.fatal(message, ...details)
}

export const error: IErrorModule = {
  fatal,
  getErrorHandler,
  is,
  op,
  throw: (message?: string | Error, ...details: any[]) => {
    state.error.throw(message, ...details)
  },
  useError,
}
