const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    _id: Joi.objectId(),
    name: Joi.string().required(),
    count: Joi.number().required(),
    coffeeShops: Joi.array(),
    defaultImageUrl: Joi.string(),
    imageGallery: Joi.array().items(Joi.string())
}

module.exports = Joi.object().keys(schema)