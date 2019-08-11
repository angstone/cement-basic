/* tslint:disable:no-unused-expression */
/* tslint:disable:no-implicit-dependencies */
import { expect } from 'chai'
import * as clearModule from 'clear-module'

import { ENVS, LOGLEVELS } from './'

describe('env', () => {
  const clear = () => {
    clearModule('./env')
    delete process.env.APP_NAME
    delete process.env.APP_AUTHOR
    delete process.env.APP_DESCRIPTION
    delete process.env.APP_LICENSE
    delete process.env.APP_VERSION
    delete process.env.APP_LOADED_AT
    delete process.env.APP_ENV
    delete process.env.APP_LOGLEVEL
  }

  beforeEach(() => {
    clear()
  })

  after(() => {
    clear()
  })

  it('should fullfill process.env with values', () => {
    expect(process.env.APP_NAME).to.be.equals(undefined)
    expect(process.env.APP_AUTHOR).to.be.equals(undefined)
    expect(process.env.APP_DESCRIPTION).to.be.equals(undefined)
    expect(process.env.APP_LICENSE).to.be.equals(undefined)
    expect(process.env.APP_VERSION).to.be.equals(undefined)
    expect(process.env.APP_LOADED_AT).to.be.equals(undefined)
    expect(process.env.APP_ENV).to.be.equals(undefined)
    expect(process.env.APP_LOGLEVEL).to.be.equals(undefined)
    require('./env').env
    expect(process.env.APP_NAME).to.be.not.equals(undefined)
    expect(process.env.APP_AUTHOR).to.be.not.equals(undefined)
    expect(process.env.APP_DESCRIPTION).to.be.not.equals(undefined)
    expect(process.env.APP_LICENSE).to.be.not.equals(undefined)
    expect(process.env.APP_VERSION).to.be.not.equals(undefined)
    expect(process.env.APP_LOADED_AT).to.be.not.equals(undefined)
    expect(process.env.APP_ENV).to.be.not.equals(undefined)
    expect(process.env.APP_LOGLEVEL).to.be.not.equals(undefined)
  })

  it('should defaults env to prod and loglevel to notes', () => {
    expect(process.env.APP_ENV).to.be.equals(undefined)
    expect(process.env.APP_LOGLEVEL).to.be.equals(undefined)
    require('./env').env
    expect(process.env.APP_ENV).to.be.equals(ENVS.PROD)
    expect(process.env.APP_LOGLEVEL).to.be.equals(LOGLEVELS.NOTE)
    clearModule('./env')
    delete process.env.APP_ENV
    delete process.env.APP_LOGLEVEL
    expect(process.env.APP_ENV).to.be.equals(undefined)
    expect(process.env.APP_LOGLEVEL).to.be.equals(undefined)
    require('./env').env
    expect(process.env.APP_ENV).to.be.equals(ENVS.PROD)
    expect(process.env.APP_LOGLEVEL).to.be.equals(LOGLEVELS.NOTE)
  })

  it('should register load time', async () => {
    expect(process.env.APP_LOADED_AT).to.be.equals(undefined)
    const nowBefore = Date.now()
    await new Promise(r => setTimeout(r, 1))
    require('./env').env
    await new Promise(r => setTimeout(r, 1))
    const nowAfter = Date.now()
    expect(process.env.APP_LOADED_AT).to.be.not.equals(undefined)
    expect(+process.env.APP_LOADED_AT!).to.be.an('number')
    expect(+process.env.APP_LOADED_AT!).to.be.at.least(nowBefore)
    expect(+process.env.APP_LOADED_AT!).to.be.at.most(nowAfter)
  })

  it('should NOT override env configs', async () => {
    process.env.APP_LOGLEVEL = LOGLEVELS.DEV_NOTE
    process.env.APP_ENV = ENVS.DEV
    require('./env').env
    expect(process.env.APP_LOGLEVEL).to.be.equals(LOGLEVELS.DEV_NOTE)
    expect(process.env.APP_ENV).to.be.equals(ENVS.DEV)
  })
})
