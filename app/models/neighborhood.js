const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    _id: Joi.objectId(),
    name: Joi.string().required(),
    areaIds: Joi.array().items(Joi.string()),
    // areaCount: Joi.number().required(),
    imageUrl: Joi.string(),
}

module.exports = Joi.object().keys(schema)