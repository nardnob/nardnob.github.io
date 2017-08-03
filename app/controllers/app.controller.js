(function () {
    'use strict';

    angular
    	.module('app')
    	.controller('appController', AppController);

    AppController.$inject = ['$log', '$timeout', '$window'];

    function AppController($log, $timeout, $window) {
        var vm = this;

        vm.authorNameInverted = false;
        vm.authorName = "Brandon Dixson"

        vm.threeJsControl = null;

        vm.clickedAuthor = clickedAuthor;

		activate();

        return vm;
        //////////

		function activate() {
			$(window).scroll(function () {
				if ($(window).scrollTop() > 100) {
					$('#main-nav-bar').addClass('main-nav-bar-fixed');
				} else if ($(window).scrollTop() < 101) {
					$('#main-nav-bar').removeClass('main-nav-bar-fixed');
				}
			});
		}

        function clickedAuthor() {
            vm.authorNameInverted = !vm.authorNameInverted;

            if(vm.authorNameInverted) {
                vm.authorName = "Brandon Dixon"
            } else {
                vm.authorName = "Brandon Dixson"
            }
        }
    }
})();
