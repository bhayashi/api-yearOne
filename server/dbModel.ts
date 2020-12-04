const { Pool } = require('pg');

// const { PG_URI } = process.env;
const PG_URI =
  'postgres://incbkmdy:vns_NvQR3CYHQ0qvvGLY5_XFnz4_IFKv@suleiman.db.elephantsql.com:5432/incbkmdy';

const pool = new Pool({ connectionString: PG_URI });

module.exports = {
  query: (text: string, params: Array<string> | void, callback: () => void) => {
    console.log('*SQL Query*', text);
    return pool.query(text, params, callback);
  },
};
