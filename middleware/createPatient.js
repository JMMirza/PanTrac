const Joi = require('joi')
module.exports = function (req, res, next) {
    req.query.vaccine = req.query.vaccine.toLowerCase()
    console.log("hello",req.query)
    const schema = {
        name: Joi.string().required(),
        dob: Joi.string().regex(/(((19|20)\d\d)\/(0[1-9]|1[0-2])\/((0|1)[0-9]|2[0-9]|3[0-1]))$/).required(),
        illnessId: Joi.number().integer().min(1).required(),
        activities: Joi.string().required(),
        dateOfDiagnosis: Joi.string().regex(/(((19|20)\d\d)\/(0[1-9]|1[0-2])\/((0|1)[0-9]|2[0-9]|3[0-1]))$/).required(),
        vaccine: Joi.string().required().valid('yes', 'no')
    }

    const {
        error
    } = Joi.validate(req.query, schema)
    if (error) {
        return res.status(400).json({
            message: 'Validation Error',
            error: error.details[0].message
        })
    }
    next()
}