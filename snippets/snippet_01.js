/* index.route.js */

(function() {
  'use strict';

  angular
    .module('weather')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      /* COPY THIS SECTION */
      .when('/forecast', {
        templateUrl: 'app/forecast/forecast.html',
        controller: 'ForecastController',
        controllerAs: 'vm'
      })
      /* END COPY */
      .otherwise({
        redirectTo: '/'
      });
  }

})();