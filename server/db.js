const Pool = require('pg').Pool
/**
 * Настройка подключения к Базе данных
 */
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "127.0.0.1",
    port: 5432,
    database: 'test'
})

module.exports = pool

