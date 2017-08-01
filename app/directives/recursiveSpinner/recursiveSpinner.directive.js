(function () {
    'use strict';

    angular
        .module('app')
        .directive('abtRecursiveSpinner', recursiveSpinnerDirective);

    function recursiveSpinnerDirective($compile, $timeout) {
        return {
            restrict: 'E',
            scope: {
                control: '=',
                depth: '=',
                radius: '=',
                foreColor: '=',
                backColor: '=',
                state: '='
            },
            controller: recursiveSpinnerController,
            controllerAs: 'ctrl',
            bindToController: true,
            link: function(scope, element, attributes) {
                scope.ctrl.ele = element;

                if(scope.ctrl.depth - 1 > 0) {
                    $compile(getHtml(scope.ctrl))(scope, function(cloned, scope){
                        element.append(cloned);
                    });
                }
            }
        }
    };

    function getHtml(ctrl) {
        return  "<div id='spinnerContainer" + ctrl.depth.toString() + "' style='" +
                "   position:absolute; " +
                "   width:" + (ctrl.radius * 4.26 / 5).toString() + "px; " +
                "   height:" + (ctrl.radius * 4.26 / 5).toString() + "px; " +
                "   left: " + (ctrl.radius * 0.74 / (5 * 2)).toString() + "px; " +
                "   top: " + (ctrl.radius * 0.74 / (5 * 2)).toString() + "px; " +
                "'>" +
                "   <abt-recursive-spinner " +
                "      depth='" + (ctrl.depth - 1).toString() + "' " +
                "      radius='" + (ctrl.radius * 4 / 5).toString() + "' " +
                "      fore-color=\"'" + ctrl.backColor + "'\" " +
                "      back-color=\"'" + ctrl.foreColor + "'\" " +
                "      control=\"ctrl.spinnerControl\" " + 
                "   >" +
                "   </abt-recursive-spinner>" +
                "</div>";
    }

    recursiveSpinnerController.$inject = ['$log', '$timeout'];

    function recursiveSpinnerController($log, $timeout) {
        var vm = this;
        
        vm.moveX = true;
        vm.moveY = true;
        
        vm.control = {
            toggleX: toggleX,
            toggleY: toggleY,
            ready: true
        }

        $timeout(afterEle, 0);

        vm.tickDirectionX = 0.002;
        vm.tickSpacingX = 0;
        
        vm.tickDirectionY = 0.002;
        vm.tickSpacingY = 0;
        
        $timeout(moveTunnel,0);

        return vm;
        //////////
        
        function toggleX() {
            vm.moveX = !vm.moveX;
            if(vm.spinnerControl && vm.spinnerControl.ready)
              vm.spinnerControl.toggleX();
        }
        
        function toggleY() {
            vm.moveY = !vm.moveY;
            if(vm.spinnerControl && vm.spinnerControl.ready)
              vm.spinnerControl.toggleY();
        }

        function moveTunnel() {
            if(vm.moveX) {
                if(vm.tickSpacingX < -0.2 || vm.tickSpacingX > 0.7) {
                    vm.tickDirectionX *= -1;
                }
                vm.tickSpacingX += vm.tickDirectionX;
            }
            
            if(vm.moveY) {
                if(vm.tickSpacingY < -0.2 || vm.tickSpacingY > 0.7) {
                    vm.tickDirectionY *= -1;
                }
                vm.tickSpacingY += vm.tickDirectionY;
            }
            
            $('#spinnerContainer' + vm.depth.toString()).css({
                'width': (vm.radius * (4.26 + vm.tickSpacingX) / 5).toString() + 'px',
                'height': (vm.radius * (4.26 + vm.tickSpacingY) / 5).toString() + 'px',
                'left': (vm.radius * (5 - (4.26 + vm.tickSpacingX)) / 5).toString() + 'px',
                'top': (vm.radius * (5 - (4.26 + vm.tickSpacingY)) / 5).toString() + 'px'
            });

            $timeout(moveTunnel, 0);
        }

        function afterEle() {
            initializeSpinner();
        }

        function initializeSpinner() {
            var radius = vm.radius.toString() + 'px';

            vm.ele.css({
                'background-color': vm.backColor,
                'width': radius,
                'height': radius,
                'position': 'absolute',
                'border-radius': (vm.radius / 2).toString() + 'px',
                'top': '0px',
                'left': '0px'
            });
        }
    }
})();