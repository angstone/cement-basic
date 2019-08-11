export interface ILogger {
  fatal: (...args: any[]) => void,
  error: (...args: any[]) => void,
  note: (...args: any[]) => void,
  dev: (...args: any[]) => void,
  dash: () => void,
}
