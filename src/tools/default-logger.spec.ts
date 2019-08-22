/* tslint:disable:no-unused-expression */
/* tslint:disable:no-implicit-dependencies */
import { expect } from 'chai'
import { spy } from 'sinon'

import chalk from 'chalk'
import { LOGLEVELS } from '../'
import { DASH_LINE, defaultLogger as dlog } from './default-logger'

describe('defaultLogger', () => {
  const stringTest = 'string test'
  let storedLogLevel: string | undefined

  before(() => {
    storedLogLevel = process.env.APP_LOGLEVEL
  })

  after(() => {
    process.env.APP_LOGLEVEL = storedLogLevel
  })

  it('should have the fatal, error, note and dev functions', () => {
    expect(dlog.fatal).to.be.exist
    expect(dlog.error).to.be.exist
    expect(dlog.note).to.be.exist
    expect(dlog.dev).to.be.exist
  })

  it('should do fatal, error, note and dev', () => {
    process.env.APP_LOGLEVEL = LOGLEVELS.DEV_NOTE
    dlog.fatal('fatal error will be like this')
    dlog.error('operational error will be like this')
    dlog.note('program execution notes will bel like this')
    dlog.dev('dev logs will be like this')
  })

  it('should ignore dev notes when not developing', () => {
    process.env.APP_LOGLEVEL = LOGLEVELS.NOTE
    const consoleLogSpy = spy(console, 'log')
    dlog.dev(stringTest)
    consoleLogSpy.should.have.been.not.called
    consoleLogSpy.restore()
  })

  it('should show dev notes when developing', () => {
    process.env.APP_LOGLEVEL = LOGLEVELS.DEV_NOTE
    const consoleLogSpy = spy(console, 'log')
    dlog.dev(stringTest)
    consoleLogSpy.should.have.been.calledWith(stringTest)
    consoleLogSpy.restore()
  })

  it('should ignore notes', () => {
    process.env.APP_LOGLEVEL = LOGLEVELS.ERROR
    const consoleLogSpy = spy(console, 'log')
    dlog.note(stringTest)
    consoleLogSpy.should.have.been.not.called
    consoleLogSpy.restore()
  })

  it('should show notes', () => {
    process.env.APP_LOGLEVEL = LOGLEVELS.NOTE
    const consoleLogSpy = spy(console, 'log')
    dlog.note(stringTest)
    consoleLogSpy.should.have.been.calledWith(chalk.blue(stringTest))
    consoleLogSpy.restore()
  })

  it('should ignore errors', () => {
    process.env.APP_LOGLEVEL = LOGLEVELS.FATAL
    const consoleLogSpy = spy(console, 'log')
    dlog.error(stringTest)
    consoleLogSpy.should.have.been.not.called
    consoleLogSpy.restore()
  })

  it('should show errors', () => {
    process.env.APP_LOGLEVEL = LOGLEVELS.ERROR
    const consoleLogSpy = spy(console, 'log')
    dlog.error(stringTest)
    consoleLogSpy.should.have.been.calledWith(chalk.yellow(stringTest))
    consoleLogSpy.restore()
  })

  it('should dash', () => {
    const consoleLogSpy = spy(console, 'log')
    dlog.dash()
    consoleLogSpy.should.have.been.calledWith(chalk.magentaBright(DASH_LINE))
    consoleLogSpy.restore()
  })
})
