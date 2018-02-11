'use strict';
export const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/';

/* -
  TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/';

+
  TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/'; */

export const PORT = process.env.PORT || 8080;
