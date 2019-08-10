/* tslint:disable:no-unused-expression */
/* tslint:disable:no-implicit-dependencies */
import { expect } from 'chai'
import { spy } from 'sinon'

import { logger } from './logger'

describe('logger', () => {
    it('should have the error, warn, success and log functions', () => {
        expect(logger.error).to.be.exist
        expect(logger.warn).to.be.exist
        expect(logger.success).to.be.exist
        expect(logger.log).to.be.exist
    })

    it('should do error, warn, success and log', () => {
        logger.error('error will be like this')
        logger.warn('warn will be like this')
        logger.success('success will be like this')
        logger.log('log will be like this')
    })

    it('should ignore dev marks when not developing', () => {
        process.env.JOBTEST_ENV = 'otherThanDev'
        const consoleLogSpy = spy(console, 'log')
        const stringTest = 'string test'
        logger.dev(stringTest)
        consoleLogSpy.should.have.been.not.called
        consoleLogSpy.restore()
    })

    it('should ignore dev marks when not developing', () => {
        process.env.JOBTEST_ENV = 'dev'
        const consoleLogSpy = spy(console, 'log')
        const stringTest = 'string test'
        logger.dev(stringTest)
        consoleLogSpy.should.have.been.calledWith(stringTest)
        consoleLogSpy.restore()
    })
})
