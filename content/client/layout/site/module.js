/* global angular */
(function() {
    'use strict'

    angular.module('client.site', ['ui.router'])

    angular.module('client.site').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('site.places', {
                url:"/places",
                views: {
                    'places': {
                        templateUrl: 'client/layout/site/places/places.html'
                    }
                }
            })
    }
})()
