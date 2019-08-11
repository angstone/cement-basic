export interface IError {
  is: (message?: string, ...details: any[]) => Error
  op: (message?: string | Error, ...details: any[]) => Error
  fatal: (message?: string | Error, ...details: any[]) => Error
  throw: (message?: string | Error, ...details: any[]) => void
}
