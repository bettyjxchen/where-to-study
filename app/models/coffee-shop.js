const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    _id: Joi.objectId(),
    name: Joi.string().required(),
    rating: Joi.number().required(),
    address: Joi.string(),
    hours: Joi.string(),
    link: Joi.string(),

    hasWifi: Joi.boolean(),
    hasOutlet: Joi.boolean(),
    hasParking: Joi.boolean(),
    openLate: Joi.boolean(),
    ampleSeating: Joi.boolean(),

}

module.exports = Joi.object().keys(schema)