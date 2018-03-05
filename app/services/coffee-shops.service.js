const CoffeeShop = require('../models/coffee-shop')
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
    return conn.db().collection('coffeeShops').find().toArray()
        .then( coffeeShops => {
            for (let i = 0; i < coffeeShops.length; i++) {
                let coffeeShop = coffeeShops[i]
                coffeeShop._id = coffeeShop._id.toString() // convert ObjectId back to string
            }
            return coffeeShops
        } )
}

function readById(id) {
    return conn.db().collection('coffeeShops').findOne({ _id: new ObjectId(id) })
        .then(coffeeShop => {
            coffeeShop._id = coffeeShop._id.toString() // convert ObjectId back to string
            return coffeeShop
        })
}

function create(model) {
    return conn.db().collection('coffeeShops').insert(model)
        .then(result => result.insertedIds[0].toString()) // "return" generated Id as string
}

function update(id, doc) {
    // convert string id used outside of MongoDB into ObjectId needed by MongoDB
    doc._id = new ObjectId(doc._id)

    return conn.db().collection('coffeeShops').replaceOne( { _id: new ObjectId(id) }, doc )
        .then(result => Promise.resolve()) // "return" nothing
}

function _delete(id) {
    return conn.db().collection('coffeeShops').deleteOne({ _id: new ObjectId(id) })
        .then(result => Promise.resolve()) // "return" nothing
}
