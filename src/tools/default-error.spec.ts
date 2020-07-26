/* tslint:disable:no-unused-expression */
/* tslint:disable:no-implicit-dependencies */
import { expect } from 'chai'
import { spy } from 'sinon'

import * as chalk from 'chalk'

import { ENVS, LOGLEVELS } from '../'

import {
  AppError,
  DEFAULT_ERROR_MESSAGE,
  defaultError as error,
  FATAL_PREFIX,
  OPERATIONAL_PREFIX,
} from './default-error'

describe('error', () => {
  it('should have an expected AppError class', () => {
    expect(AppError).to.be.exist
    let appError = new AppError()
    expect(appError).to.be.exist
    expect(appError instanceof Error).to.be.true
    expect(appError.message).to.be.equal(DEFAULT_ERROR_MESSAGE)
    expect(appError.details).to.be.an('array').that.is.empty

    appError = new AppError('some message')
    expect(appError instanceof Error).to.be.true
    expect(appError.message).to.be.equal('some message')
    expect(appError.details).to.be.an('array').that.is.empty

    appError = new AppError('some message', 'some other detail', {
      detail: 'object',
    })
    expect(appError instanceof Error).to.be.true
    expect(appError.message).to.be.equal('some message')
    expect(appError.details[0]).to.be.equal('some other detail')
    expect(appError.details[1]).to.be.deep.equal({ detail: 'object' })
  })

  describe('is function', () => {
    it('act as shortcut for creating errors', () => {
      expect(error.is).to.be.exist
      let appError = error.is()
      expect(appError).to.be.exist
      expect(appError instanceof AppError).to.be.true
      expect(appError.message).to.be.equal(DEFAULT_ERROR_MESSAGE)
      expect((appError as AppError).details).to.be.an('array').that.is.empty

      appError = error.is('some message')
      expect(appError instanceof Error).to.be.true
      expect(appError.message).to.be.equal('some message')
      expect((appError as AppError).details).to.be.an('array').that.is.empty

      appError = error.is('some message', 'some other detail', {
        detail: 'object',
      })
      expect(appError instanceof Error).to.be.true
      expect(appError.message).to.be.equal('some message')
      expect((appError as AppError).details[0]).to.be.equal('some other detail')
      expect((appError as AppError).details[1]).to.be.deep.equal({
        detail: 'object',
      })
    })
  })

  describe('throw function', () => {
    it('throw errors in expected ways', () => {
      expect(error.throw).to.be.exist

      try {
        error.throw()
      } catch (appError) {
        expect(appError).to.be.exist
        expect(appError instanceof AppError).to.be.true
        expect(appError.message).to.be.equal(DEFAULT_ERROR_MESSAGE)
        expect(appError.details).to.be.an('array').that.is.empty
      }

      try {
        error.throw('some message')
      } catch (appError) {
        expect(appError).to.be.exist
        expect(appError instanceof AppError).to.be.true
        expect(appError.message).to.be.equal('some message')
        expect(appError.details).to.be.an('array').that.is.empty
      }

      try {
        error.throw('some message', 'some other detail', {
          detail: 'object',
        })
      } catch (appError) {
        expect(appError).to.be.exist
        expect(appError instanceof AppError).to.be.true
        expect(appError.message).to.be.equal('some message')
        expect(appError.details[0]).to.be.equal('some other detail')
        expect(appError.details[1]).to.be.deep.equal({
          detail: 'object',
        })
      }

      try {
        error.throw(new AppError('app error'))
      } catch (appError) {
        expect(appError).to.be.exist
        expect(appError instanceof AppError).to.be.true
        expect(appError.message).to.be.equal('app error')
        expect(appError.details).to.be.an('array').that.is.empty
      }

      try {
        error.throw(new Error('strange error'))
      } catch (appError) {
        expect(appError).to.be.exist
        expect(appError.message).to.be.equal('strange error')
      }
    })
  })

  describe('op function', () => {
    let currentEnv: string | undefined
    let currentLoglevel: string | undefined

    before(() => {
      currentEnv = process.env.APP_ENV
      currentLoglevel = process.env.APP_LOGLEVEL
      process.env.APP_ENV = ENVS.DEV
      process.env.APP_LOGLEVEL = LOGLEVELS.DEV_NOTE
    })

    after(() => {
      if (currentEnv) {
        process.env.APP_ENV = currentEnv
      }
      if (currentLoglevel) {
        process.env.APP_LOGLEVEL = currentLoglevel
      }
    })

    it('should exists', () => {
      expect(error.op).to.be.exist
    })

    it('should warn in logger a void error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.op()
      consoleLogSpy.should.have.been.calledWith(
        chalk.yellow(OPERATIONAL_PREFIX + DEFAULT_ERROR_MESSAGE)
      )
      consoleLogSpy.restore()
    })

    it('should warn in logger a message error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.op('some error')
      consoleLogSpy.should.have.been.calledWith(
        chalk.yellow(OPERATIONAL_PREFIX + 'some error')
      )
      consoleLogSpy.restore()
    })

    it('should print in logger a detailed error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.op('detailed error', 'with', { several: 'details' })
      consoleLogSpy.should.have.been.calledWith(
        chalk.yellow(OPERATIONAL_PREFIX + 'detailed error')
      )
      consoleLogSpy.should.have.been.calledWith(chalk.yellow('with'))
      consoleLogSpy.restore()
    })

    it('should warn already existent void error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.op(new Error())
      expect(consoleLogSpy).to.have.been.calledWith(
        chalk.yellow(OPERATIONAL_PREFIX + DEFAULT_ERROR_MESSAGE)
      )
      consoleLogSpy.restore()
    })

    it('should warn already existent message error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.op(new Error('some error'))
      expect(consoleLogSpy).to.have.been.calledWith(
        chalk.yellow(OPERATIONAL_PREFIX + 'some error')
      )
      consoleLogSpy.restore()
    })

    it('should warn already existent app error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.op(error.is('app error'))
      expect(consoleLogSpy).to.have.been.calledWith(
        chalk.yellow(OPERATIONAL_PREFIX + 'app error')
      )
      consoleLogSpy.restore()
    })

    it('should warn already existent message error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.op(new Error('some error'))
      expect(consoleLogSpy).to.have.been.calledWith(
        chalk.yellow(OPERATIONAL_PREFIX + 'some error')
      )
      consoleLogSpy.restore()
    })

    it('should warn already existent app error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.op(error.is('app error'))
      expect(consoleLogSpy).to.have.been.calledWith(
        chalk.yellow(OPERATIONAL_PREFIX + 'app error')
      )
      consoleLogSpy.restore()
    })

    it('should warn already existent app detailed error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.op(error.is('detailed error', 'with', { several: 'details' }))
      expect(consoleLogSpy).to.have.been.calledWith(
        chalk.yellow(OPERATIONAL_PREFIX + 'detailed error')
      )
      consoleLogSpy.restore()
    })
  })

  describe('fatal function', () => {
    let currentEnv: string | undefined
    let currentLoglevel: string | undefined

    before(() => {
      currentEnv = process.env.APP_ENV
      currentLoglevel = process.env.APP_LOGLEVEL
      process.env.APP_ENV = ENVS.DEV
      process.env.APP_LOGLEVEL = LOGLEVELS.DEV_NOTE
    })

    after(() => {
      if (currentEnv) {
        process.env.APP_ENV = currentEnv
      }
      if (currentLoglevel) {
        process.env.APP_LOGLEVEL = currentLoglevel
      }
    })

    it('should exists', () => {
      expect(error.fatal).to.be.exist
    })

    it('should warn in logger a void error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.fatal()
      consoleLogSpy.should.have.been.calledWith(
        chalk.red(FATAL_PREFIX + DEFAULT_ERROR_MESSAGE)
      )
      consoleLogSpy.restore()
    })

    it('should warn in logger a message error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.fatal('some error')
      consoleLogSpy.should.have.been.calledWith(
        chalk.red(FATAL_PREFIX + 'some error')
      )
      consoleLogSpy.restore()
    })

    it('should print in logger a detailed error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.fatal('detailed error', 'with', { several: 'details' })
      consoleLogSpy.should.have.been.calledWith(
        chalk.red(FATAL_PREFIX + 'detailed error')
      )
      consoleLogSpy.should.have.been.calledWith(chalk.red('with'))
      consoleLogSpy.restore()
    })

    it('should warn already existent void error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.fatal(new Error())
      expect(consoleLogSpy).to.have.been.calledWith(
        chalk.red(FATAL_PREFIX + DEFAULT_ERROR_MESSAGE)
      )
      consoleLogSpy.restore()
    })

    it('should warn already existent message error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.fatal(new Error('some error'))
      expect(consoleLogSpy).to.have.been.calledWith(
        chalk.red(FATAL_PREFIX + 'some error')
      )
      consoleLogSpy.restore()
    })

    it('should warn already existent app error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.fatal(error.is('app error'))
      expect(consoleLogSpy).to.have.been.calledWith(
        chalk.red(FATAL_PREFIX + 'app error')
      )
      consoleLogSpy.restore()
    })

    it('should warn already existent message error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.fatal(new Error('some error'))
      expect(consoleLogSpy).to.have.been.calledWith(
        chalk.red(FATAL_PREFIX + 'some error')
      )
      consoleLogSpy.restore()
    })

    it('should warn already existent app error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.fatal(error.is('app error'))
      expect(consoleLogSpy).to.have.been.calledWith(
        chalk.red(FATAL_PREFIX + 'app error')
      )
      consoleLogSpy.restore()
    })

    it('should warn already existent app detailed error', () => {
      const consoleLogSpy = spy(console, 'log')
      error.fatal(error.is('detailed error', 'with', { several: 'details' }))
      expect(consoleLogSpy).to.have.been.calledWith(
        chalk.red(FATAL_PREFIX + 'detailed error')
      )
      consoleLogSpy.restore()
    })
  })
})
