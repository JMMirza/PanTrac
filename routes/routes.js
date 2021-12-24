const express = require('express');
const router = express.Router();
const creatIllnessMiddleware = require('../middleware/createIllness')
const creatPatientMiddleware = require('../middleware/createPatient')
const {
    createIllness,
    createPatient
} = require('../controller/postMethods')
router.post("/createIllness", creatIllnessMiddleware,createIllness)
router.post("/createPatient", creatPatientMiddleware,createPatient)
module.exports = router;