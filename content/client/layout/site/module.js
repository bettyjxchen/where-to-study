/* global angular */
(function () {
    'use strict'

    angular.module('client.site', ['ui.router'])

    angular.module('client.site').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('site.home', {
                url: "/",
                views: {
                    'content@site': {
                        templateUrl: 'client/layout/site/homepage/homepage.html'
                    }
                }
            })
            .state('site.neighborhood', {
                url: "/neighborhood",
                views: {
                    'content@site': {
                        templateUrl: 'client/layout/site/neighborhood/neighborhood.html',
                        controller:
                            'neighborhoodController as neighborhoodCtrl'
                    }
                }
            })
            .state('site.list', {
                url: "/neighborhood/:neighborhood?area",
                views: {
                    'content@site': {
                        templateUrl: 'client/layout/site/list/list.html',
                        controller: 'listController as listCtrl'
                    }
                },
                resolve: {
                    neighborhood: getNeighborhood,
                    area: getArea
                }
            })
    }

    getNeighborhood.$inject = ['neighborhoodService', 'areaService', '$stateParams']
    function getNeighborhood(neighborhoodService, areaService, $stateParams) {
        return neighborhoodService.readByName($stateParams.neighborhood)
            .then(data => data.item[0])
    }

    getArea.$inject = ['areaService', '$stateParams']
    function getArea(areaService, $stateParams) {
        if ($stateParams.area) {
            return areaService.readByName($stateParams.area)
                .then(data => data.item[0])
        }
        else {
            return null
        }
    }

})()
