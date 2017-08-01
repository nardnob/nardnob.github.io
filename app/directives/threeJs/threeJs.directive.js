(function () {
    'use strict';

    angular
        .module('app')
        .directive('bkdThreeJs', threeJsDirective);

    function threeJsDirective() {
        return {
            restrict: 'A',
            scope: {
                control: '='
            },
            controller: threeJsController,
            controllerAs: 'vm',
            bindToController: true,
            link: function(scope, element, attributes) {
                scope.vm.ele = element;
            }
        }
    };

    threeJsController.$inject = ['$log', '$timeout', '$window'];

    function threeJsController($log, $timeout, $window) {
        var vm = this;

        vm.control = {
            addCube: addCube
        }

        vm.scene = null;
        vm.camera = null;
        vm.renderer = null;
        vm.pointLight = null;

        vm.keys = {
            left: false,
            right: false,
            up: false,
            down: false
        }

        vm.cubes = [];

        $timeout(initializeThreeJs, 0);

        $window.addEventListener('keydown', handleKeyDown, false);
        $window.addEventListener('keyup', handleKeyUp, false);

        return vm;
        //////////

        function handleKeyDown(event) {
            $log.log("handleKeyDown() - keycode: " + event.keyCode);
            switch(event.keyCode) {
                case 37:
                    $log.log("handleKeyDown() - left");
                    vm.keys.left = true;
                    event.preventDefault();
                    break;
                case 39:
                    $log.log("handleKeyDown() - right");
                    vm.keys.right = true;
                    event.preventDefault();
                    break;
                case 38:
                    $log.log("handleKeyDown() - up");
                    vm.keys.up = true;
                    event.preventDefault();
                    break;
                case 40:
                    $log.log("handleKeyDown() - down");
                    vm.keys.down = true;
                    event.preventDefault();
                    break;
            }
        }

        function handleKeyUp(event) {
            $log.log("handleKeyUp() - keycode: " + event.keyCode);
            switch(event.keyCode) {
                case 37:
                    $log.log("handleKeyUp() - left");
                    vm.keys.left = false;
                    event.preventDefault();
                    break;
                case 39:
                    $log.log("handleKeyUp() - right");
                    vm.keys.right = false;
                    event.preventDefault();
                    break;
                case 38:
                    $log.log("handleKeyUp() - up");
                    vm.keys.up = false;
                    event.preventDefault();
                    break;
                case 40:
                    $log.log("handleKeyUp() - down");
                    vm.keys.down = false;
                    event.preventDefault();
                    break;
            }
        }

        function initializeThreeJs() {
            vm.scene = new THREE.Scene();
            vm.camera = new THREE.PerspectiveCamera(75, vm.ele.width() / vm.ele.height(), 0.1, 1000);
            vm.renderer = new THREE.WebGLRenderer();
            vm.pointLight = new THREE.PointLight(0xFFFFFF);

            vm.renderer.setSize(vm.ele.width(), vm.ele.height());
            vm.ele.append(vm.renderer.domElement);

            vm.camera.position.z = 5;

            vm.pointLight.position.x = 0;
            vm.pointLight.position.y = 10;
            vm.pointLight.position.z = 10;

            vm.scene.add(vm.pointLight);

            render();
        }

        function render() {
            requestAnimationFrame(render);
            updateCamera();
            updatePhysics();
            vm.renderer.render(vm.scene, vm.camera);
        };

        function updateCamera() {
        }

        function updatePhysics() {
            for(var i = 0; i < vm.cubes.length; i++) {
                vm.cubes[i].rotation.y += 0.01;
            }

            var delta = 0.1;
            if(vm.cubes.length > 0) {
                if(vm.keys.left) {
                    vm.cubes[0].position.x -= delta;
                }

                if(vm.keys.right) {
                    vm.cubes[0].position.x += delta;
                }

                if(vm.keys.up) {
                    vm.cubes[0].position.y += delta;
                }

                if(vm.keys.down) {
                    vm.cubes[0].position.y -= delta;
                }
            }
        }

        function addCube(width, height, depth) {
            $log.log("bkdThreeJs.addCube() - width:" + width + ", height:" + height + ", depth:" + depth);

            if(!width || !height || !depth) {
                $log.log("bkdThreeJs.addCube() - invalid width, height, or depth.");
                return;
            }

            var geometry = new THREE.BoxGeometry(width, height, depth);
            var material = new THREE.MeshPhongMaterial({
                color: 0x00ff00
            });
            var cube = new THREE.Mesh(geometry, material);
            vm.cubes.push(cube);
            vm.scene.add(cube);
        }
    }
})();