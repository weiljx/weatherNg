/* forecast.controller.js */

(function() {
  'use strict';

  angular
    .module('weather')
    .controller('ForecastController', ForecastController);

  /** @ngInject */
  function ForecastController($log, weatherService) {  //inject weatherService into the controller
    var vm = this;                 
    
    // call our dummyData on the weatherService
    var dummyData = weatherService.dummyData;
    
    // map the data
    vm.city = dummyData.city;
    vm.main = dummyData.main;
    vm.precip = dummyData.precip;
    vm.humidity = dummyData.humidity;
    vm.wind= dummyData.wind;
    vm.unit= dummyData.unit;
                
    $log.debug('vm', vm);         
  }
})();