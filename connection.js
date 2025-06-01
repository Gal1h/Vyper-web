const mySQL = require('mysql');
const DB = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "resource"
})
console.log("test")
module.exports = DB;
