import chalk from 'chalk'
/* tslint:disable:no-console */
export const logger = {
    dev: (...args: any[]) => {
        if (process.env.JOBTEST_ENV === 'dev') {
            console.log(...args)
        }
    },
    error: (...args: any[]) => console.log(chalk.red(...args)),
    log: (...args: any[]) => console.log(chalk.blue(...args)),
    success: (...args: any[]) => console.log(chalk.green(...args)),
    warn: (...args: any[]) => console.log(chalk.yellow(...args)),
}
