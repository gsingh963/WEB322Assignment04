const { Pool, Client } = require('pg')
const connectionString = 'postgres://olplroqsizwzuw:9ec1111f22d969702776b8a39c07b4520c75b32fd38a1fa0b2158b9d8c18f387@ec2-54-157-160-218.compute-1.amazonaws.com:5432/dd4bjjtdulja0d'
const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool;