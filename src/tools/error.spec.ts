/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'chai';
import { spy } from 'sinon';

import { IError } from '../';
import { defaultError } from './default-error';
import { error, state } from './error';

describe('error', () => {
  const objectTest = new Error('Amazing Nice Error');

  /* tslint:disable:no-empty */
  const mockError: IError = {
    fatal: (message?: string | Error, ...details: any[]): Error => new Error(),
    is: (message?: string, ...details: any[]): Error => new Error(),
    op: (message?: string | Error, ...details: any[]): Error => new Error(),
    throw: (message?: string | Error, ...details: any[]): void => {}
  };

  after(() => {
    error.useError(defaultError);
  });

  it('should have the fatal, op, is and throw functions', () => {
    expect(error.fatal).to.be.exist;
    expect(error.op).to.be.exist;
    expect(error.is).to.be.exist;
    expect(error.throw).to.be.exist;
  });

  it('should use mock error', () => {
    error.useError(mockError);
    expect(state.error).to.be.equals(mockError);
  });

  it('should do fatal, error, note and dev', () => {
    error.useError(mockError);
    const errorIsSpy = spy(mockError, 'is');
    const errorOpSpy = spy(mockError, 'op');
    const errorFatalSpy = spy(mockError, 'fatal');
    const errorThrowSpy = spy(mockError, 'throw');
    error.is(JSON.stringify(objectTest));
    error.op(objectTest);
    error.fatal(objectTest);
    error.throw(objectTest);
    errorIsSpy.should.have.been.calledWith(JSON.stringify(objectTest));
    errorOpSpy.should.have.been.calledWith(objectTest);
    errorFatalSpy.should.have.been.calledWith(objectTest);
    errorThrowSpy.should.have.been.calledWith(objectTest);
    errorIsSpy.restore();
    errorOpSpy.restore();
    errorFatalSpy.restore();
    errorThrowSpy.restore();
  });
});
