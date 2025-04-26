const Joi = require('joi');

const validateNewUser = Joi.object({
    full_name: Joi.string().max(50).required().messages({
        "any.required": "Full Name is required",
        "string.empty": "Full Name is required",
        "string.max": "Maximum 50 characters allowed",
    }),
    email: Joi.string().email({ minDomainSegments: 2 }).lowercase().max(50).required().messages({
        "any.required": "Email is required",
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email",
        "string.max": "Maximum 50 characters allowed",
    }),
    password: Joi.string().min(8).max(50).required().messages({
        "any.required": "Password is required",
        "string.empty": "Password is required",
        "string.min": "Minimum 8 character required",
        "string.max": "Maximum 50 characters allowed",
    })
})

module.exports = {
    validateNewUser
}