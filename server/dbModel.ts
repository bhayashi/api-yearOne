const { Pool } = require('pg');
require('dotenv').config();

const { PG_URI } = process.env;

const pool = new Pool({ connectionString: PG_URI });

module.exports = {
  query: (text: string, params: Array<string> | void, callback: () => void) => {
    console.log('*SQL Query*', text);
    return pool.query(text, params, callback);
  },
};
