import { IHashMap } from '../interfaces';

export const LOGLEVELS = {
  FATAL: 'fatal',
  ERROR: 'error',
  NOTE: 'note',
  DEV_NOTE: 'dev_note'
};

export const LOGLEVEL_NUMERIC: IHashMap<number> = {};
LOGLEVEL_NUMERIC[LOGLEVELS.FATAL] = 0;
LOGLEVEL_NUMERIC[LOGLEVELS.ERROR] = 1;
LOGLEVEL_NUMERIC[LOGLEVELS.NOTE] = 2;
LOGLEVEL_NUMERIC[LOGLEVELS.DEV_NOTE] = 3;
