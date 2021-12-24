const mysql = require('mysql')
const config = require('../config')

function connectDB() {
    return mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password
    });
}

function createDB() {
    const con = connectDB()
    con.connect(function (err) {
        if (err) throw err;
        const checkSqlDB = `SHOW DATABASES LIKE '${config.dbname}'`
        con.query(checkSqlDB, function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                const sqlQuery = `CREATE DATABASE ${config.dbname}`
                con.query(sqlQuery, (err, result) => {
                    if (err) throw err;
                    console.log("Database created: ", result);
                })
            } else {
                console.log(`Database connection established to ${config.dbname}`)
            }
            
        });
    });

}
module.exports = {
    createDB,
    connectDB
}