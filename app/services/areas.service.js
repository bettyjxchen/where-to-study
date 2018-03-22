const Area = require('../models/area')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    readAll: readAll,
    readById: readById,
    readByName: readByName,
    create: create,
    update: update,
    deactivate: deactivate
}

//*********** Mongo Aggregation Pipeline ***********//
var matchDeactivated = { "dateDeactivated": null }
var lookupCoffeeShops = {
    from: 'coffeeShops',
    localField: '_id',
    foreignField: 'areaId',
    as: 'coffeeShops'
}
var coffeeShopProject = {
    $map: {
        input: '$areas.coffeeShops',
        as: 'coffeeShop',
        in: {
            name: '$$coffeeShop.name',
            areaName: '$areas.name',
            _id: "$$coffeeShop._id",
            areaId: "$$coffeeShop.areaI",
            rating: "$$coffeeShop.rating",
            description: "$$coffeeShop.description",
            address: "$$coffeeShop.address",
            hours: "$$coffeeShop.hours",
            link: "$$coffeeShop.link",
            imageUrl: "$$coffeeShop.imageUrl",
            hasWifi: "$$coffeeShop.hasWifi",
            hasOutlet: "$$coffeeShop.hasOutlet",
            hasParking: "$$coffeeShop.hasParking",
            openLate: "$$coffeeShop.openLate",
            ampleSeating: "$$coffeeShop.ampleSeating"
        }
    }
}
//*************************************************//

function readAll() {
    return conn.db().collection('areas').aggregate([
        {
            $match: matchDeactivated
        },
        {
            $sort: { "name": 1 }
        },
        {
            $facet: {
                areas: [
                    {
                        $lookup: {
                            from: 'coffeeShops',
                            localField: '_id',
                            foreignField: 'areaId',
                            as: 'coffeeShops'
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            coffeeShopIds: 1,
                            coffeeShops: 1,
                            dateCreated: 1,
                            dateModified: 1,
                            dateDeactivated: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$areas"
        },
        {
            $project: {
                _id: "$areas._id",
                name: "$areas.name",
                coffeeShopIds: "$areas.coffeeShopIds",
                // coffeeShops: "$areas.coffeeShops",
                coffeeShops: coffeeShopProject,
                dateCreated: "$areas.dateCreated",
                dateModified: "$areas.dateModified",
                dateDeactivated: "$areas.dateDeactivated",

            }
        }
    ]).toArray()
        .then(areas => {
            areas.map(readMapping)
            return areas
        })
}

function readById(id) {
    return conn.db().collection('areas').aggregate([
        {
            $match: { $and: [matchDeactivated, { "_id": new ObjectId(id) }] }
        },
        {
            $facet: {
                areas: [
                    {
                        $lookup: {
                            from: 'coffeeShops',
                            localField: '_id',
                            foreignField: 'areaId',
                            as: 'coffeeShops'
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            coffeeShopIds: 1,
                            coffeeShops: 1,
                            dateCreated: 1,
                            dateModified: 1,
                            dateDeactivated: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$areas"
        },
        {
            $project: {
                _id: "$areas._id",
                name: "$areas.name",
                coffeeShopIds: "$areas.coffeeShopIds",
                // coffeeShops: "$areas.coffeeShops",
                coffeeShops: coffeeShopProject,
                dateCreated: "$areas.dateCreated",
                dateModified: "$areas.dateModified",
                dateDeactivated: "$areas.dateDeactivated",

            }
        }
    ]).toArray()
        .then(area => {
            area.map(readMapping)
            return area
        })
}

function readByName(name) {
    return conn.db().collection('areas').aggregate([
        {
            $match: { $and: [matchDeactivated, { "name": name }] }
        },
        {
            $facet: {
                areas: [
                    {
                        $lookup: {
                            from: 'coffeeShops',
                            localField: '_id',
                            foreignField: 'areaId',
                            as: 'coffeeShops'
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            coffeeShopIds: 1,
                            coffeeShops: 1,
                            dateCreated: 1,
                            dateModified: 1,
                            dateDeactivated: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$areas"
        },
        {
            $project: {
                _id: "$areas._id",
                name: "$areas.name",
                coffeeShopIds: "$areas.coffeeShopIds",
                // coffeeShops: "$areas.coffeeShops",
                coffeeShops: coffeeShopProject,
                dateCreated: "$areas.dateCreated",
                dateModified: "$areas.dateModified",
                dateDeactivated: "$areas.dateDeactivated",

            }
        }
    ]).toArray()
        .then(area => {
            area.map(readMapping)
            return area
        })
}

function create(model) {
    writeMapping(doc)

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
    writeMapping(model)

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

function deactivate(id) {
    return conn.db().collection('areas').updateOne({ _id: new ObjectId(id) })
        .then(result => Promise.resolve())
}

//*************** Helper Functions ****************//
function readMapping(model) {
    model._id = model._id.toString()
    model.coffeeShopIds.forEach(id => id = id.toString())
    if (model.coffeeShops.length) {
        model.coffeeShops.forEach(coffeeShop => coffeeShop._id = coffeeShop._id.toString())
    }
    model.coffeeShopCount = model.coffeeShopIds.length

    return model
}

function writeMapping(model) {
    model.coffeeShopIds.forEach(id => id = id.toString())
}
//*************************************************//