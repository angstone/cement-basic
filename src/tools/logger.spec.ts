/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'chai';
import { spy } from 'sinon';

import { ILogger } from '../';
import { defaultLogger } from './default-logger';
import { logger, state } from './logger';

describe('logger', () => {
  const objectTest = {
    data: {
      complex: 'stuf',
      with: ['an', 'array']
    },
    name: 'object test'
  };

  const mockLogger: ILogger = {
    dash: () => {},
    dev: (...args) => {},
    error: (...args) => {},
    fatal: (...args) => {},
    note: (...args) => {}
  };

  after(() => {
    logger.useLogger(defaultLogger);
  });

  it('should have the fatal, error, note and dev functions', () => {
    expect(logger.fatal).to.be.exist;
    expect(logger.error).to.be.exist;
    expect(logger.note).to.be.exist;
    expect(logger.dev).to.be.exist;
    expect(logger.dash).to.be.exist;
    expect(logger.useLogger).to.be.exist;
  });

  it('should use mock logger', () => {
    logger.useLogger(mockLogger);
    expect(state.logger).to.be.equals(mockLogger);
  });

  it('should do fatal, error, note and dev', () => {
    logger.useLogger(mockLogger);
    const loggerDashSpy = spy(mockLogger, 'dash');
    const loggerDevSpy = spy(mockLogger, 'dev');
    const loggerNoteSpy = spy(mockLogger, 'note');
    const loggerErrorSpy = spy(mockLogger, 'error');
    const loggerFatalSpy = spy(mockLogger, 'fatal');
    logger.dash();
    logger.fatal(objectTest);
    logger.error(objectTest);
    logger.note(objectTest);
    logger.dev(objectTest);
    loggerDashSpy.should.have.been.called;
    loggerDevSpy.should.have.been.calledWith(objectTest);
    loggerNoteSpy.should.have.been.calledWith(objectTest);
    loggerErrorSpy.should.have.been.calledWith(objectTest);
    loggerFatalSpy.should.have.been.calledWith(objectTest);
    loggerDashSpy.restore();
    loggerDevSpy.restore();
    loggerNoteSpy.restore();
    loggerErrorSpy.restore();
    loggerFatalSpy.restore();
  });
});
