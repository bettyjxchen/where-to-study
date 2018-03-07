const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    _id: Joi.objectId(),
    neighborhoodId: Joi.string().required(),
    name: Joi.string().required(),
    coffeeShopIds: Joi.array().items(Joi.objectId()).allow(null),
}

module.exports = Joi.object().keys(schema)