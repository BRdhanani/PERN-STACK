const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'fullstackdb',
    password: '',
    port: 5432
})

module.exports = pool