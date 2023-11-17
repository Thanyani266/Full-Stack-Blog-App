const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "266701",
    database: "blog"
})

module.exports = db