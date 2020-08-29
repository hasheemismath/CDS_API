const Pool = require("pg").Pool;
const pool = new Pool({
    user:"postgres",
    password:"hasheemhush119",
    database: "_cds",
    host:"localhost",
    port: 5432
})

module.exports = pool;