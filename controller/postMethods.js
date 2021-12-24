const {
    connectDB
} = require('../utils/db.connection')
const config = require('../config')
const conn = connectDB()

function createIllness(req, res) {
    conn.query(`USE ${config.dbname}`, (err, result) => {
        if (err) throw err;
        let sql = 'SHOW TABLES like "ILLNESS"';
        conn.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            if (result.length == 0) {
                let sql = 'CREATE TABLE ILLNESS(ILLNESSID INT AUTO_INCREMENT PRIMARY KEY,NAME VARCHAR(255) UNIQUE,SYMPTOMS VARCHAR(255),VACCINE ENUM("Yes","No"))';
                conn.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log("table created")
                })
            }
            let insertQuery = `INSERT IGNORE INTO ILLNESS(NAME,SYMPTOMS,VACCINE)values("${req.query.name}","${req.query.symptoms}","${req.query.vaccine}")`
            console.log(req.query, req.body, req.body.vaccine)
            conn.query(insertQuery, (err, result) => {
                if (err) throw err;
                res.send({
                    'ILLNESS table created and data inserted...': result
                });
            })
        });
    })

}

function createPatient(req, res) {
    conn.query(`USE ${config.dbname}`, (err, result) => {
        if (err) throw err;
        let sql = 'SHOW TABLES like "PATIENTS"';
        conn.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            if (result.length == 0) {
                let sql = 'CREATE TABLE PATIENTS(PATIENTID INT AUTO_INCREMENT PRIMARY KEY,NAME VARCHAR(225),DOB VARCHAR(225),ILLNESSID INT,ACTIVITIES VARCHAR(225),DATEOFDIAGNOSIS VARCHAR(255),VACCINE ENUM("Yes", "No"),FOREIGN KEY(ILLNESSID) REFERENCES ILLNESS(ILLNESSID))';
                conn.query(sql, (err, result) => {
                    if (err) console.log("err: ", err);
                    console.log("table created")
                })
            }
            let insertQuery = `INSERT IGNORE INTO PATIENTS(NAME,DOB,ILLNESSID,ACTIVITIES,DATEOFDIAGNOSIS,VACCINE)values("${req.query.name}","${req.query.dob}",${req.query.illnessId},"${req.query.activities}","${req.query.dateOfDiagnosis}","${req.query.vaccine}")`
            console.log(req.query, req.body, req.body.vaccine)
            conn.query(insertQuery, (err, result) => {
                if (err) throw err;
                res.send({
                    'PATIENTS table created and data is inserted...': result
                });
            })
        });
    })
}
module.exports = {
    createIllness,
    createPatient
}