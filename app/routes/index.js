const router = require('express').Router()
const authenticate = require('../filters/authenticate')
const clientRoutes = require('./client.routes')
const hackersRoutes = require('./hackers.routes')
const neighborhoodsRoutes = require('./neighborhoods.routes')
const areasRoutes = require('./areas.routes')
const coffeeShopsRoutes = require('./coffee-shops.routes')

module.exports = router

// check authentication for all requests
router.use(authenticate)

// API routes (group routing modules here - no empty lines between)
router.use('/api/hackers', hackersRoutes)
router.use('/api/neighborhoods', neighborhoodsRoutes)
router.use('/api/areas', areasRoutes)
router.use('/api/coffee-shops', coffeeShopsRoutes)

// API error handlers (API routes must be registered before this)
useAPIErrorHandlers(router)

// register client routes
router.use(clientRoutes)

function useAPIErrorHandlers(router) {
    // Handle API 404
    router.use('/api/*', (req, res, next) => {
        res.sendStatus(404)
    })

    // Handle API 500
    router.use((err, req, res, next) => {
        // If the error object doesn't exists
        if (!err) {
            return next()
        }

        // Log it
        console.error(err.stack)

        // Redirect to error page
        res.sendStatus(500)
    })
}