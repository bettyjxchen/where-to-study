const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    _id: Joi.objectId(),
    name: Joi.string().required(),
    coffeeShopIds: Joi.array().items(Joi.objectId()).allow(null),
    coffeeShopCount: Joi.number()
}

module.exports = Joi.object().keys(schema)