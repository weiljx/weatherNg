(function() {
  'use strict';

  angular
    .module(weatherAppName)
    .controller('TechController', TechController);

  /** @ngInject */
  function TechController($timeout, webDevTec) {
    var vm = this;

    vm.awesomeThings = [];
    vm.buildNumber = "2016.1.15.1";

    activate();

    function activate() {
      getWebDevTec();     
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }    

  }
})();
