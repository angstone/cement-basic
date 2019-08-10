/* tslint:disable:no-console */
/* tslint:disable:no-unused-expression */
import { expect } from 'chai'
import { spy } from 'sinon'

import chalk from 'chalk'

import {
    DEFAULT_ERROR_MESSAGE,
    error,
    JobtestError,
    OPERATIONAL_PREFIX,
} from './error'

describe('error', () => {
    it('should have an expected JobtestError class', () => {
        expect(JobtestError).to.be.exist
        let jobtestError = new JobtestError()
        expect(jobtestError).to.be.exist
        expect(jobtestError instanceof Error).to.be.true
        expect(jobtestError.message).to.be.equal(DEFAULT_ERROR_MESSAGE)
        expect(jobtestError.details).to.be.an('array').that.is.empty

        jobtestError = new JobtestError('some message')
        expect(jobtestError instanceof Error).to.be.true
        expect(jobtestError.message).to.be.equal('some message')
        expect(jobtestError.details).to.be.an('array').that.is.empty

        jobtestError = new JobtestError('some message', 'some other detail', {
            detail: 'object',
        })
        expect(jobtestError instanceof Error).to.be.true
        expect(jobtestError.message).to.be.equal('some message')
        expect(jobtestError.details[0]).to.be.equal('some other detail')
        expect(jobtestError.details[1]).to.be.deep.equal({ detail: 'object' })
    })

    describe('is function', () => {
        it('act as shortcut for creating errors', () => {
            expect(error.is).to.be.exist
            let jobtestError = error.is()
            expect(jobtestError).to.be.exist
            expect(jobtestError instanceof Error).to.be.true
            expect(jobtestError.message).to.be.equal(DEFAULT_ERROR_MESSAGE)
            expect(jobtestError.details).to.be.an('array').that.is.empty

            jobtestError = error.is('some message')
            expect(jobtestError instanceof Error).to.be.true
            expect(jobtestError.message).to.be.equal('some message')
            expect(jobtestError.details).to.be.an('array').that.is.empty

            jobtestError = error.is('some message', 'some other detail', {
                detail: 'object',
            })
            expect(jobtestError instanceof Error).to.be.true
            expect(jobtestError.message).to.be.equal('some message')
            expect(jobtestError.details[0]).to.be.equal('some other detail')
            expect(jobtestError.details[1]).to.be.deep.equal({
                detail: 'object',
            })
        })
    })

    describe('throw function', () => {
        it('throw errors in expected ways', () => {
            expect(error.throw).to.be.exist

            try {
                error.throw()
            } catch (jobtestError) {
                expect(jobtestError).to.be.exist
                expect(jobtestError instanceof JobtestError).to.be.true
                expect(jobtestError.message).to.be.equal(DEFAULT_ERROR_MESSAGE)
                expect(jobtestError.details).to.be.an('array').that.is.empty
            }

            try {
                error.throw('some message')
            } catch (jobtestError) {
                expect(jobtestError).to.be.exist
                expect(jobtestError instanceof JobtestError).to.be.true
                expect(jobtestError.message).to.be.equal('some message')
                expect(jobtestError.details).to.be.an('array').that.is.empty
            }

            try {
                error.throw('some message', 'some other detail', {
                    detail: 'object',
                })
            } catch (jobtestError) {
                expect(jobtestError).to.be.exist
                expect(jobtestError instanceof JobtestError).to.be.true
                expect(jobtestError.message).to.be.equal('some message')
                expect(jobtestError.details[0]).to.be.equal('some other detail')
                expect(jobtestError.details[1]).to.be.deep.equal({
                    detail: 'object',
                })
            }

            try {
                error.throw(new JobtestError('jobtest error'))
            } catch (jobtestError) {
                expect(jobtestError).to.be.exist
                expect(jobtestError instanceof JobtestError).to.be.true
                expect(jobtestError.message).to.be.equal('jobtest error')
                expect(jobtestError.details).to.be.an('array').that.is.empty
            }

            try {
                error.throw(new Error('strange error'))
            } catch (jobtestError) {
                expect(jobtestError).to.be.exist
                expect(jobtestError.message).to.be.equal('strange error')
            }
        })

        it('throw JobtestErrors in expected ways', () => {
            expect(error.throwJobtestError).to.be.exist

            try {
                error.throwJobtestError()
            } catch (jobtestError) {
                expect(jobtestError).to.be.exist
                expect(jobtestError instanceof JobtestError).to.be.true
                expect(jobtestError.message).to.be.equal(DEFAULT_ERROR_MESSAGE)
                expect(jobtestError.details).to.be.an('array').that.is.empty
            }

            try {
                error.throwJobtestError('some message')
            } catch (jobtestError) {
                expect(jobtestError).to.be.exist
                expect(jobtestError instanceof JobtestError).to.be.true
                expect(jobtestError.message).to.be.equal('some message')
                expect(jobtestError.details).to.be.an('array').that.is.empty
            }

            try {
                error.throwJobtestError('some message', 'some other detail', {
                    detail: 'object',
                })
            } catch (jobtestError) {
                expect(jobtestError).to.be.exist
                expect(jobtestError instanceof JobtestError).to.be.true
                expect(jobtestError.message).to.be.equal('some message')
                expect(jobtestError.details[0]).to.be.equal('some other detail')
                expect(jobtestError.details[1]).to.be.deep.equal({
                    detail: 'object',
                })
            }

            try {
                error.throwJobtestError(new JobtestError('jobtest error'))
            } catch (jobtestError) {
                expect(jobtestError).to.be.exist
                expect(jobtestError instanceof JobtestError).to.be.true
                expect(jobtestError.message).to.be.equal('Error: jobtest error')
                expect(jobtestError.details).to.be.an('array').that.is.empty
            }

            try {
                error.throwJobtestError(new Error('strange error'))
            } catch (jobtestError) {
                expect(jobtestError).to.be.exist
                expect(jobtestError.message).to.be.equal('Error: strange error')
            }
        })
    })

    describe('op function', () => {
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

        it('should warn in logger a detailed error', () => {
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
            expect(console.log).to.have.been.calledWith(
                chalk.yellow(OPERATIONAL_PREFIX + DEFAULT_ERROR_MESSAGE)
            )
            consoleLogSpy.restore()
        })

        it('should warn already existent message error', () => {
            const consoleLogSpy = spy(console, 'log')
            error.op(new Error('some error'))
            expect(console.log).to.have.been.calledWith(
                chalk.yellow(OPERATIONAL_PREFIX + 'some error')
            )
            consoleLogSpy.restore()
        })

        it('should warn already existent jobtest error', () => {
            const consoleLogSpy = spy(console, 'log')
            error.op(error.is('jobtest error'))
            expect(console.log).to.have.been.calledWith(
                chalk.yellow(OPERATIONAL_PREFIX + 'jobtest error')
            )
            consoleLogSpy.restore()
        })

        it('should warn already existent jobtest detailed error', () => {
            const consoleLogSpy = spy(console, 'log')
            error.op(error.is('detailed error', 'with', { several: 'details' }))
            expect(console.log).to.have.been.calledWith(
                chalk.yellow(OPERATIONAL_PREFIX + 'detailed error')
            )
            consoleLogSpy.restore()
        })
    })
})
