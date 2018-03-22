const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    _id: Joi.objectId(),
    areaId: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
    rating: Joi.number().required(),
    address: Joi.string(),
    hours: Joi.string(),
    link: Joi.string(),
    imageUrl: Joi.string(),
    imageGallery: Joi.array().items(Joi.string()).allow(null),

    hasWifi: Joi.boolean(),
    hasOutlet: Joi.boolean(),
    hasParking: Joi.boolean(),
    openLate: Joi.boolean(),
    ampleSeating: Joi.boolean(),

}

module.exports = Joi.object().keys(schema)