/* global angular */
(function () {
    angular.module('client.site')
        .controller('layoutController', LayoutController)

    LayoutController.$inject = ['$stateParams', 'neighborhoodService', '$anchorScroll',
        '$timeout', '$location']

    function LayoutController($stateParams, neighborhoodService, $anchorScroll, $timeout, $location) {
        var vm = this
        vm.neighborhoods = []

        init()

        function init() {
            _scrollToTop()

            neighborhoodService.readAll()
                .then(neighborhoods => {
                    vm.neighborhoods = neighborhoods.items
                    // for (var i = 0; i < vm.neighborhoods.length; i++) {
                    //     for (var j = 0; j < vm.neighborhoods[i].areas.length; j++) {
                    //         vm.neighborhoods[i].coffeeShopCount = vm.neighborhoods[i].areas[j].coffeeShopIds.length
                    //     }
                    // }
                    // console.log(vm.neighborhoods)
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
