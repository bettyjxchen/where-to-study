const CoffeeShop = require('../models/coffee-shop')
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
    return conn.db().collection('coffeeShops').find().toArray()
        .then( coffeeShops => {
            for (let i = 0; i < coffeeShops.length; i++) {
                let coffeeShop = coffeeShops[i]
                coffeeShop._id = coffeeShop._id.toString() 
            }
            return coffeeShops
        })
}

function readById(id) {
    return conn.db().collection('coffeeShops')
        .findOne({ _id: new ObjectId(id) })
        .then(coffeeShop => {
            coffeeShop._id = coffeeShop._id.toString() 
            return coffeeShop
        })
}

function create(model) {
    let doc = {
        name: model.name,
        rating: model.rating,
        address: model.address,
        hours: model.hours,
        link: model.link,
        imageUrl: model.imageUrl,
        imageGallery: model.imageGallery,
        hasWifi: model.hasWifi,
        hasOutlet: model.hasOutlet,
        hasParking: model.hasParking,
        openLate: model.openLate,
        ampleSeating: model.ampleSeating,
        
        dateCreated: new Date(),
        dateModified: null,
        dateDeactivated: null
    }

    return conn.db().collection('coffeeShops')
        .insert(doc)
        .then(result => result.insertedIds[0].toString()) 
}

function update(id, model) {
    let doc = {
        _id: new ObjectId(model._id),
        name: model.name,
        rating: model.rating,
        address: model.address,
        hours: model.hours,
        link: model.link,
        imageUrl: model.imageUrl,
        imageGallery: model.imageGallery,
        hasWifi: model.hasWifi,
        hasOutlet: model.hasOutlet,
        hasParking: model.hasParking,
        openLate: model.openLate,
        ampleSeating: model.ampleSeating,
    
        dateModified: new Date()      
    }
    return conn.db().collection('coffeeShops')
        .updateOne( { _id: new ObjectId(id) }, { $set: doc } )
        .then(result => Promise.resolve()) 
}

function _deactivate(id) {
    return conn.db().collection('coffeeShops')
        .updateOne({ _id: new ObjectId(id) }, { $currentDate: { dateDeactivated: true, dateModified: true } })
        .then(result => Promise.resolve())
}
