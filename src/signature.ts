import { env, logger } from './'

export const signature = () => {
  logger.dash()
  logger.note(`
   APP: ${env.APP_NAME}
   Description: ${env.APP_DESCRIPTION}
   version: ${env.APP_VERSION}
   Author: ${env.APP_AUTHOR}
   License: ${env.APP_LICENSE}
   loaded at ${env.APP_LOADED_AT}
  `)
}
