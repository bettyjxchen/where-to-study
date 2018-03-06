const Neighborhood = require('../models/neighborhood')
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
    return conn.db().collection('neighborhoods').find().toArray()
        .then(neighborhoods => {
            for (let i = 0; i < neighborhoods.length; i++) {
                let neighborhood = neighborhoods[i]
                neighborhood._id = neighborhood._id.toString()
            }
            return neighborhoods
        })
}

function readById(id) {
    return conn.db().collection('neighborhoods').findOne({ _id: new ObjectId(id) })
        .then(neighborhood => {
            neighborhood._id = neighborhood._id.toString()
            return neighborhood
        })
}

function create(model) {
    let doc = {
        name: model.name,
        areaIds: model.areaIds,
        imageUrl: model.imageUrl
    }

    return conn.db().collection('neighborhoods').insert(doc)
        .then(result => result.insertedIds[0].toString())
}

function update(id, model) {
    let doc = {
        _id: new ObjectId(model._id),
        name: model.name,
        areaIds: model.areaIds,
        imageUrl: model.imageUrl
    }

    return conn.db().collection('neighborhoods').updateOne({ _id: new ObjectId(id) }, doc)
        .then(result => Promise.resolve())
}

function _deactivate(id) {
    return conn.db().collection('neighborhoods').updateOne({ _id: new ObjectId(id) })
        .then(result => Promise.resolve())
}
