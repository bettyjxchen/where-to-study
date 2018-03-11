/* global angular */
(function () {
    angular.module('client.site')
        .controller('neighborhoodController', NeighborhoodController)

    NeighborhoodController.$inject = ['$stateParams', 'neighborhoodService', '$anchorScroll',
        '$timeout', '$location']

    function NeighborhoodController($stateParams, neighborhoodService, $anchorScroll, $timeout, $location) {
        var vm = this
        vm.neighborhoods = []


        init()

        function init() {
            _scrollToTop()

            neighborhoodService.readAll()
                .then(neighborhoods => {
                    vm.neighborhoods = neighborhoods.items
                    for (var i = 0; i < vm.neighborhoods.length; i++) {
                        for (var j = 0; j < vm.neighborhoods[i].areas.length; j++) {
                            vm.neighborhoods[i].coffeeShopCount = vm.neighborhoods[i].areas[j].coffeeShopIds.length
                        }
                    }
                    console.log(vm.neighborhoods)
                })

        }

        function _scrollToTop() {
            $timeout(() => {
                $location.hash('')
                $anchorScroll()
            })
        }
    }
})()
