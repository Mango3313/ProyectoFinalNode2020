const mysql = require('mysql');
const util = require('util');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DBHOST,
    user:process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME
});

pool.query = util.promisify(pool.query);

module.exports = pool;