import { expect } from 'chai';

import { signature } from './';

describe('signature', () => {
  it('should exist', () => {
    expect(signature).to.be.exist;
  });

  it('should run', () => {
    signature();
    expect(true).to.be.true;
  });
});
