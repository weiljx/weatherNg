(function() {
  'use strict';

  angular
    .module(weatherAppName)
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/tech/tech.html',
        controller: 'TechController',
        controllerAs: 'tech'
      })
      .when('/forcast', {
        templateUrl: 'app/forcast/forcast.html',
        controller: 'ForcastController',
        controllerAs: 'forcast'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
