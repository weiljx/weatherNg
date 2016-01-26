(function() {
  'use strict';

  angular
    .module('weather')
    .directive('weatherNgNavbar', weatherNgNavbar); 

  /** @ngInject */
  function weatherNgNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          buildNumber: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($location, $timeout) { 
        var vm = this;
        vm.buildNumber = '2016.1.15.1';
        vm.openMobileClass = '';       
        
        vm.active = {
            tech: '',
            forcast: ''
        };        
        
        vm.toggleOpen = function(){
            if(vm.openMobileClass === ''){
                vm.openMobileClass = 'in';
            }
            else{
                vm.openMobileClass = '';
            }
        };
        
        vm.changeTab = function(){
            $timeout(function(){
                for(var property in vm.active) {
                    vm.active[property] = '';
                }
                var currentPath = $location.path();
                currentPath = currentPath.replace("/", "")
                if(currentPath === ""){
                    currentPath = 'tech';
                }
                vm.active[currentPath] = 'active';
            }, 10);            
        };
        
        vm.changeTab(); 
    }
  }

})();
