const Joi = require('@hapi/joi')

const registerValidation = (body) =>{

    const validationSchema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(body, validationSchema)
}

const loginValidation = (body)=>{
    const validationSchema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(body, validationSchema)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation