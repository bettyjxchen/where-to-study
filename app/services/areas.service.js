const Area = require('../models/area')
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
    return conn.db().collection('areas').find().toArray()
        .then( areas => {
            for (let i = 0; i < areas.length; i++) {
                let area = areas[i]
                area._id = area._id.toString() // convert ObjectId back to string
            }
            return areas
        } )
}

function readById(id) {
    return conn.db().collection('areas').findOne({ _id: new ObjectId(id) })
        .then(area => {
            area._id = area._id.toString() // convert ObjectId back to string
            return area
        })
}

function create(model) {
    return conn.db().collection('areas').insert(model)
        .then(result => result.insertedIds[0].toString()) // "return" generated Id as string
}

function update(id, doc) {
    // convert string id used outside of MongoDB into ObjectId needed by MongoDB
    doc._id = new ObjectId(doc._id)

    return conn.db().collection('areas').replaceOne( { _id: new ObjectId(id) }, doc )
        .then(result => Promise.resolve()) // "return" nothing
}

function _delete(id) {
    return conn.db().collection('areas').deleteOne({ _id: new ObjectId(id) })
        .then(result => Promise.resolve()) // "return" nothing
}
