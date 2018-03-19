const Neighborhood = require('../models/neighborhood')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    readAll: readAll,
    readById: readById,
    readByName: readByName,
    create: create,
    update: update,
    deactivate: _deactivate
}

//*********** Mongo Aggregation Pipeline ***********//
var matchDeactivated = { "dateDeactivated": null }
var lookupAreas = {
    from: 'areas',
    localField: '_id',
    foreignField: 'neighborhoodId',
    as: 'areas'
}
//*************************************************//

function readAll() {
    return conn.db().collection('neighborhoods').aggregate([
        {
            $match: matchDeactivated
        },
        {
            $sort: { "name": 1 }
        },
        {
            $facet: {
                neighborhoods: [
                    {
                        $lookup: {
                            from: 'areas',
                            localField: '_id',
                            foreignField: 'neighborhoodId',
                            as: 'areas'
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            areaIds: 1,
                            areas: 1,
                            imageUrl: 1,
                            dateCreated: 1,
                            dateModified: 1,
                            dateDeactivated: 1
                        }
                    },
                    // {
                    //     $unwind: "$areas"
                    // },
                    // {
                    //     $sort: { "name": 1 }
                    // },
                    // {
                    //     $group: { "name": "$name" }
                    // }
                ]
            }
        },
        {
            $unwind: "$neighborhoods"
        },
        {
            $project: {
                _id: "$neighborhoods._id",
                name: "$neighborhoods.name",
                areaIds: "$neighborhoods.areaIds",
                areas: "$neighborhoods.areas",
                imageUrl: "$neighborhoods.imageUrl",
                dateCreated: "$neighborhoods.dateCreated",
                dateModified: "$neighborhoods.dateModified",
                dateDeactivated: "$neighborhoods.dateDeactivated",

            }
        }
    ]).toArray()
        .then(neighborhoods => {
            neighborhoods.map(readMapping)
            return neighborhoods
        })
}

function readById(id) {
    return conn.db().collection('neighborhoods').aggregate([
        {
            $match: { $and: [matchDeactivated, { "_id": new ObjectId(id) }] }
        },
        {
            $facet: {
                neighborhoods: [
                    {
                        $lookup: lookupAreas
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            areaIds: 1,
                            areas: 1,
                            imageUrl: 1,
                            dateCreated: 1,
                            dateModified: 1,
                            dateDeactivated: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$neighborhoods"
        },
        {
            $project: {
                _id: "$neighborhoods._id",
                name: "$neighborhoods.name",
                areaIds: "$neighborhoods.areaIds",
                areas: "$neighborhoods.areas",
                imageUrl: "$neighborhoods.imageUrl",
                dateCreated: "$neighborhoods.dateCreated",
                dateModified: "$neighborhoods.dateModified",
                dateDeactivated: "$neighborhoods.dateDeactivated",

            }
        }
    ]).toArray()
        .then(neighborhood => {
            neighborhood.map(readMapping)
            return neighborhood
        })
}

function readByName(name) {
    let match = { $and: [matchDeactivated, { "name": name }] }

    return conn.db().collection('neighborhoods').aggregate([
        {
            $match: match
        },
        {
            $facet: {
                neighborhoods: [
                    {
                        $lookup: lookupAreas
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            areaIds: 1,
                            areas: 1,
                            imageUrl: 1,
                            dateCreated: 1,
                            dateModified: 1,
                            dateDeactivated: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$neighborhoods"
        },
        {
            $project: {
                _id: "$neighborhoods._id",
                name: "$neighborhoods.name",
                areaIds: "$neighborhoods.areaIds",
                areas: "$neighborhoods.areas",
                imageUrl: "$neighborhoods.imageUrl",
                dateCreated: "$neighborhoods.dateCreated",
                dateModified: "$neighborhoods.dateModified",
                dateDeactivated: "$neighborhoods.dateDeactivated",

            }
        }
    ]).toArray()
        .then(neighborhood => {
            neighborhood.map(readMapping)
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
    writeMapping(model)

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

//*************** Helper Functions ****************//
function readMapping(model) {
    model._id = model._id.toString()
    model.areaIds.forEach(id => id = id.toString())
    model.areas.forEach(area => area._id = area._id.toString())
    model.areaCount = model.areaIds.length

    return model
}

function writeMapping(model) {
    model.areaIds.forEach(id => id = id.toString())
}
//*************************************************//