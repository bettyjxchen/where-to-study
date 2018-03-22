/* global angular */
(function () {
    angular.module('client.site')
        .controller('listController', ListController)

    ListController.$inject = ['$stateParams', 'neighborhoodService', 'areaService', '$anchorScroll',
        '$timeout', '$location', 'neighborhood', 'area']

    function ListController($stateParams, neighborhoodService, areaService, $anchorScroll, $timeout, $location, neighborhood, area) {
        var vm = this
        vm.coffeeShopArrayMaster = []
        vm.coffeeShopArray = []
        vm.neighborhood = {}
        vm.area = {}
        vm.tags = {
            hasWifi: false,
            hasOutlet: false,
            hasParking: false,
            openLate: false,
            ampleSeating: false
        }

        vm.hasWifiChange = _hasWifiChange
        vm.hasOutletChange = _hasOutletChange
        vm.hasParkingChange = _hasParkingChange
        vm.openLateChange = _openLateChange
        vm.ampleSeatingChange = _ampleSeatingChange
        vm.clearFilters = _clearFilters

        init()

        function init() {
            scrollToTop()

            //set neighborhood first
            vm.neighborhood = neighborhood

            //check if specific area
            if (area) {
                vm.area = area
                vm.coffeeShopArrayMaster = vm.area.coffeeShops
                vm.coffeeShopArrayMaster.map(convertRating)
                vm.coffeeShopArray = angular.copy(vm.coffeeShopArrayMaster)
            }

            //else return all areas in neighborhood
            else {
                for (var i = 0; i < vm.neighborhood.areas.length; i++) {
                    let area = vm.neighborhood.areas[i]
                    areaService.readByName(area.name)
                        .then(data => {
                            area = data.item[0]
                            area.coffeeShops.map(convertRating)
                            vm.coffeeShopArrayMaster = vm.coffeeShopArrayMaster.concat(area.coffeeShops)
                        })
                        .then(() => {
                            vm.coffeeShopArray = angular.copy(vm.coffeeShopArrayMaster)
                            console.log(vm.coffeeShopArray)
                        })
                }
            }
        }

        function _hasWifiChange() {
            //has wifi
            if (vm.tags.hasWifi) {
                for (var i = 0; i < vm.coffeeShopArray.length; i++) {
                    if (!vm.coffeeShopArray[i].hasWifi) {
                        vm.coffeeShopArray.splice(i, 1)
                    }
                }
            }

            //remove wifi filter
            else {
                for (var i = 0; i < vm.coffeeShopArrayMaster.length; i++) {
                    if (!vm.coffeeShopArrayMaster[i].hasWifi) {
                        vm.coffeeShopArray.push(vm.coffeeShopArrayMaster[i])
                    }
                }
            }
        }

        function _hasOutletChange() {
            //outlet filter
            if (vm.tags.hasOutlet) {
                for (var i = 0; i < vm.coffeeShopArray.length; i++) {
                    if (!vm.coffeeShopArray[i].hasOutlet) {
                        vm.coffeeShopArray.splice(i, 1)
                    }
                }
            }

            //remove filter
            else {
                for (var i = 0; i < vm.coffeeShopArrayMaster.length; i++) {
                    if (!vm.coffeeShopArrayMaster[i].hasOutlet) {
                        vm.coffeeShopArray.push(vm.coffeeShopArrayMaster[i])
                    }
                }
            }
        }

        function _hasParkingChange() {
            //parking filter
            if (vm.tags.hasParking) {
                for (var i = 0; i < vm.coffeeShopArray.length; i++) {
                    if (!vm.coffeeShopArray[i].hasParking) {
                        vm.coffeeShopArray.splice(i, 1)
                    }
                }
            }

            //remove filter
            else {
                for (var i = 0; i < vm.coffeeShopArrayMaster.length; i++) {
                    if (!vm.coffeeShopArrayMaster[i].hasParking) {
                        vm.coffeeShopArray.push(vm.coffeeShopArrayMaster[i])
                    }
                }
            }
        }

        function _openLateChange() {
            //open late
            if (vm.tags.openLate) {
                for (var i = 0; i < vm.coffeeShopArray.length; i++) {
                    if (!vm.coffeeShopArray[i].openLate) {
                        vm.coffeeShopArray.splice(i, 1)
                    }
                }
            }

            //remove filter
            else {
                for (var i = 0; i < vm.coffeeShopArrayMaster.length; i++) {
                    if (!vm.coffeeShopArrayMaster[i].openLate) {
                        vm.coffeeShopArray.push(vm.coffeeShopArrayMaster[i])
                    }
                }
            }
        }

        function _ampleSeatingChange() {
            //ampleSeating
            if (vm.tags.ampleSeating) {
                for (var i = 0; i < vm.coffeeShopArray.length; i++) {
                    if (!vm.coffeeShopArray[i].ampleSeating) {
                        vm.coffeeShopArray.splice(i, 1)
                    }
                }
            }

            //remove filter
            else {
                for (var i = 0; i < vm.coffeeShopArrayMaster.length; i++) {
                    if (!vm.coffeeShopArrayMaster[i].ampleSeating) {
                        vm.coffeeShopArray.push(vm.coffeeShopArrayMaster[i])
                    }
                }
            }
        }

        function _clearFilters() {
            vm.tags = {
                hasWifi: false,
                hasOutlet: false,
                hasParking: false,
                openLate: false,
                ampleSeating: false
            }

            vm.coffeeShopArray = angular.copy(vm.coffeeShopArrayMaster)
        }

        //*************** Helper Functions ****************//
        function convertRating(coffeeShop) {
            let ratingStars = "☆☆☆☆☆"
            ratingStars = ratingStars.split("")
            for (var i = 0; i < coffeeShop.rating; i++) {
                ratingStars[i] = "★"
            }
            ratingStars = ratingStars.join("")
            coffeeShop.rating = ratingStars
            return coffeeShop
        }

        function scrollToTop() {
            $timeout(() => {
                $location.hash('top')
                $anchorScroll()
            })
        }
        //*************************************************//
    }

})()
