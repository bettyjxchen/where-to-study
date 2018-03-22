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
    let coffeeShopArray = []
    return conn.db().collection('coffeeShops').find().toArray()
        .then(coffeeShops => {
            //sort by ranking
            coffeeShops = coffeeShops.sort(function (a, b) {
                return a.ranking > b.ranking
            })

            for (let i = 0; i < coffeeShops.length; i++) {
                let coffeeShop = coffeeShops[i]
                coffeeShop._id = coffeeShop._id.toString()
            }
            //find areaName from areaId
            var promiseArray = []
            coffeeShops.map(coffeeShop => {
                let promise = conn.db().collection('areas').findOne({ _id: new ObjectId(coffeeShop.areaId), 'dateDeactivated': null })
                    .then(area => {
                        coffeeShop.areaName = area.name
                    })
                promiseArray.push(promise)
                return coffeeShop
            })

            coffeeShopArray = coffeeShops
            return promiseArray
        })
        .then(promiseArray => {
            return Promise.all(promiseArray)
        })
        .then(() => coffeeShopArray)

}

function readById(id) {
    let coffeeShopObj = {}
    return conn.db().collection('coffeeShops').findOne({ _id: new ObjectId(id) })
        .then(coffeeShop => {
            coffeeShop._id = coffeeShop._id.toString()
            coffeeShopObj = coffeeShop
            return coffeeShop
        })
        .then(coffeeShop => {
            return conn.db().collection('areas').findOne({ _id: new ObjectId(coffeeShop.areaId), 'dateDeactivated': null })
        })
        .then(area => {
            coffeeShopObj.areaName = area.name
        })
        .then(() => coffeeShopObj)
}

function create(model) {
    model.areaId = model.areaId.toString()

    let doc = {
        name: model.name,
        areaId: model.areaId,
        description: model.description,
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

    return conn.db().collection('coffeeShops').insert(doc)
        .then(result => result.insertedIds[0].toString())
        .then(() => {
            conn.db().collection('areas').findOne({ _id: model.areaId }, { 'dateDeactivated': null })
                .then(area => {
                    area = area.item[0]
                    area.coffeeShopIds.push(coffeeShop._id)
                })
        })
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
        .updateOne({ _id: new ObjectId(id) }, { $set: doc })
        .then(result => Promise.resolve())
}

function _deactivate(id) {
    return conn.db().collection('coffeeShops')
        .updateOne({ _id: new ObjectId(id) }, { $currentDate: { dateDeactivated: true, dateModified: true } })
        .then(result => Promise.resolve())
}
