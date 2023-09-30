const mysql = require('mysql');
const util = require('util');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 1000,
    host: process.env.DB_CONN_HOST,
    user: process.env.DB_CONN_USER,
    password: process.env.DB_CONN_PW,
    multipleStatements: true



})
