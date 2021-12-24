const express = require("express");
var bodyParser = require('body-parser')
const {
    createDB
} = require('./utils/db.connection')
createDB()
var app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())
// routes
app.use('/api', require('./routes/routes.js'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));