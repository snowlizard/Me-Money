require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    database: process.env.DATABASE
});

module.exports = pool;