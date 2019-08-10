import { IHashMap } from '../interfaces'

/* tslint:disable:object-literal-sort-keys */
export const LOGLEVELS: IHashMap<string> = {
  ERROR_FATAL: 'error_fatal',
  ERROR: 'error',
  NOTE: 'note',
  DEV_NOTE: 'dev_note',
}

export const LOGLEVEL_NUMERIC: IHashMap<number> = {}
LOGLEVEL_NUMERIC[LOGLEVELS.ERROR_FATAL] = 0
LOGLEVEL_NUMERIC[LOGLEVELS.ERROR] = 1
LOGLEVEL_NUMERIC[LOGLEVELS.NOTE] = 2
LOGLEVEL_NUMERIC[LOGLEVELS.DEV_NOTE] = 3
