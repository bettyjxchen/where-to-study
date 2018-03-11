/* global angular */
(function () {
    angular.module('client.site')
        .controller('listController', ListController)

    ListController.$inject = ['$stateParams', 'neighborhoodService', 'areaService', '$anchorScroll',
        '$timeout', '$location', 'neighborhood', 'area']

    function ListController($stateParams, neighborhoodService, areaService, $anchorScroll, $timeout, $location, neighborhood, area) {
        var vm = this
        vm.neighborhood = {}
        vm.area = {}
        vm.coffeeShopArray = []

        init()

        function init() {
            _scrollToTop()

            //set neighborhood first
            vm.neighborhood = neighborhood
            console.log(`this is for neighborhood: ${vm.neighborhood.name}`)
            console.log(vm.neighborhood)

            //check if only one area
            if (area) {
                vm.area = area
                for (var i = 0; i < vm.area.coffeeShops.length; i++) {
                    vm.coffeeShopArray.push(vm.area.coffeeShops[i])
                }
            }

            //else return all area in neighborhood
            else {
                for (var i = 0; i < vm.neighborhood.areas.length; i++) {
                    let area = vm.neighborhood.areas[i]
                    areaService.readByName(area.name)
                        .then(data => {
                            area = data.item[0]
                            for (var i = 0; i < area.coffeeShops.length; i++) {
                                vm.coffeeShopArray.push(area.coffeeShops[i])
                            }
                        })
                }
            }
            console.log(vm.coffeeShopArray)
        }

        function _scrollToTop() {
            $timeout(() => {
                $location.hash('')
                $anchorScroll()
            })
        }


    }

})()
