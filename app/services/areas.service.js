const Area = require('../models/area')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    readAll: readAll,
    readById: readById,
    create: create,
    update: update,
    deactivate: _deactivate
}

function readAll() {
    return conn.db().collection('areas').find().toArray()
        .then(areas => {
            for (let i = 0; i < areas.length; i++) {
                let area = areas[i]
                area._id = area._id.toString()
            }
            return areas
        })
}

function readById(id) {
    return conn.db().collection('areas').findOne({ _id: new ObjectId(id) })
        .then(area => {
            area._id = area._id.toString()
            return area
        })
}

function create(model) {
    let doc = {
        name: model.name,
        coffeeShopIds: model.coffeeShopIds,
        coffeeShopCount: model.coffeeShopCount,

        dateCreated: new Date(),
        dateModified: null,
        dateDeactivated: null
    }
    return conn.db().collection('areas').insert(doc)
        .then(result => result.insertedIds[0].toString()) 
}

function update(id, model) {
    model.coffeeShopIds.forEach(id => id = id.toString())

    let doc = {
        _id: new ObjectId(model._id),
        name: model.name,
        coffeeShopIds: model.coffeeShopIds,
        coffeeShopCount: model.coffeeShopCount,

        dateModified: new Date()
    }
  
    return conn.db().collection('areas').updateOne({ _id: new ObjectId(id) }, doc)
        .then(result => Promise.resolve()) 
}

function _deactivate(id) {
    return conn.db().collection('areas').updateOne({ _id: new ObjectId(id) })
        .then(result => Promise.resolve()) 
}
