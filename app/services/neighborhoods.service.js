const Neighborhood = require('../models/neighborhood')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    readAll: readAll,
    readById: readById,
    create: create,
    update: update,
    delete: _delete
}

function readAll() {
    return conn.db().collection('neighborhoods').find().toArray()
        .then(neighborhoods => {
            for (let i = 0; i < neighborhoods.length; i++) {
                let neighborhood = neighborhoods[i]
                neighborhood._id = neighborhood._id.toString() // convert ObjectId back to string
            }
            return neighborhoods
        } )
}

function readById(id) {
    return conn.db().collection('neighborhoods').findOne({ _id: new ObjectId(id) })
        .then(neighborhood => {
            neighborhood._id = neighborhood._id.toString() // convert ObjectId back to string
            return neighborhood
        })
}

function create(model) {
    return conn.db().collection('neighborhoods').insert(model)
        .then(result => result.insertedIds[0].toString()) // "return" generated Id as string
}

function update(id, doc) {
    // convert string id used outside of MongoDB into ObjectId needed by MongoDB
    doc._id = new ObjectId(doc._id)

    return conn.db().collection('neighborhoods').replaceOne( { _id: new ObjectId(id) }, doc )
        .then(result => Promise.resolve()) // "return" nothing
}

function _delete(id) {
    return conn.db().collection('neighborhoods').deleteOne({ _id: new ObjectId(id) })
        .then(result => Promise.resolve()) // "return" nothing
}
