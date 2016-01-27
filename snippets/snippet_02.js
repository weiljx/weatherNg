/* forecast.controller.js */

(function() {
  'use strict';

  angular
    .module('weather')
    .controller('ForecastController', ForecastController);

  /** @ngInject */
  function ForecastController($log) {
    var vm = this;                 
    
    $log.debug('vm', vm);         
  }
})();
