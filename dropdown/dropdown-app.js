(function () {
    var app = angular.module('dropdown-app', []);

    app.directive('dropdown', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                width: '@',
                maxHeight: '@',
                ngModel: '=',
                onChange: '@'
            },
            templateUrl: "dropdown/template/dropdown.html",
            link: function(scope, element, attrs, ctrl, transclude) {
                // find ul and append transclude inside this ul
                var ul = element.find('ul');

                // put parameters to ul
                ul.css('width', scope.width ? scope.width : null);

                if (scope.maxHeight) {
                    ul.css('maxHeight', scope.maxHeight);
                    ul.css('overflow', 'auto');
                }

                $timeout(defineNoUl, 0);

                // show or hide ul
                function defineNoUl() {
                    var length = ul.find('li.dropdown-header').length;
                    if(!length) {
                        scope.dropdown.noUl = true;
                    }
                }

                transclude(scope, function(clone, scope) {
                    ul.append(clone);
                });
            },
            controller: ['$scope', function($scope) {
                // init scope dropdown
                $scope.dropdown = {};
                $scope.dropdown.selectedCar = 3;
                $scope.dropdown.query = '';

                this.changeModel = function(id) {
                    var onchange = $scope.$eval($scope.onChange);
                    onchange(id);
                };

                this.selectCar = function (id) {
                    $scope.dropdown.selectedCar = id;
                };

                this.clearFilter = function () {
                    $scope.dropdown.query = '';
                };

                this.focusOnInput = function() {
                    $timeout(function() {
                        $('#searchCar')[0].focus();
                    }, 0);
                };

                $scope.cars = [
                    {
                        title: 'Седаны',
                        list: [
                            { id: 1, title: 'Mazda 6' },
                            { id: 2, title: 'Bmw 328i' },
                            { id: 3, title: 'Mercedes C' },
                            { id: 4, title: 'Audi A4' }
                        ]
                    },
                    {
                        title: 'Кроссоверы',
                        list: [
                            { id: 5, title: 'Mazda CX-5' },
                            { id: 6, title: 'Bmw X5' },
                            { id: 7, title: 'Mercedes ML' },
                            { id: 8, title: 'Audi Q7' }
                        ]
                    }
                ];


            }],
            controllerAs: 'dropdownCtrl'
        };
    }]);

    app.directive('itemGroup', [function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            link: function(scope, element, attrs, ctrl, transclude) {
                scope.title = attrs.title;

                transclude(scope, function(clone, scope) {
                    element.after(clone);
                });
            },
            templateUrl: "dropdown/template/item-group.html",
            controller: ['$scope', function($scope) {

            }],
            controllerAs: 'itemGroupCtrl'
        };
    }]);

    app.directive('item', [function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            link: function(scope, element, attrs, ctrl, transclude) {
                transclude(scope, function(clone, scope) {
                    var a = element.find('a');
                    a.append(clone);
                });
            },
            templateUrl: "dropdown/template/item.html",
            controller: ['$scope', function($scope) {

            }],
            controllerAs: 'itemCtrl'
        };
    }]);

})();

