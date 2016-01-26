(function () {
    "use strict";

    angular
        .module(weatherAppName)
        .directive("weatherTile", weatherTile);    
    
  /** @ngInject */
  function weatherTile() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/weatherTile/weatherTile.html',
      replace: true,
      scope: {
          model: '=weatherModel'
      },
      controller: weatherTileController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function weatherTileController($log) { 
        var vm = this;                
        $log.debug('vm', vm);        
    }
  }
    
})();
