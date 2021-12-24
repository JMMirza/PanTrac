const Joi = require('joi')
module.exports = function (req, res, next) {
    req.query.vaccine = req.query.vaccine.toLowerCase()
    const schema = {
        name: Joi.string().required().error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "any.required":
                        return {
                            message: "Enter Name"
                        };
                    case "any.empty":
                        return {
                            message: "Name is not allowed to be empty"
                        };
                }
            })
        }),
        symptoms: Joi.string().required().error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "any.required":
                        return {
                            message: "Enter Name"
                        };
                    case "any.empty":
                        return {
                            message: "symptoms is not allowed to be empty"
                        };
                }
            })
        }),
        vaccine: Joi.string().required().valid('yes', 'no').error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "any.required":
                        return {
                            message: "Enter vaccine"
                        };
                    case "any.empty":
                        return {
                            message: "Vaccine is not allowed to be empty"
                        };
                }
            })
        })

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