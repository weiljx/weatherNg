(function() {
  'use strict';

  angular
    .module('weather')
    .controller('ForcastController', ForcastController);

  /** @ngInject */
  function ForcastController(weatherService, $log) {
    var vm = this;
    
    vm.show = false;
    vm.tempUnits = 'f';
    vm.FarenheightClass = 'btn-primary';
    vm.CelciusClass = '';    
    vm.data = {};
    
    vm.findWeather = function(){
        $log.debug('location', vm.location);
        activate(vm.location, vm.tempUnits);
        vm.location = '';
    };
    
    vm.toggleUnits = function(unit){        
        
        if(unit ==='c') {
            vm.FarenheightClass = '';
            vm.CelciusClass = 'btn-primary';
        }
        else if(unit ==='f') {
            vm.FarenheightClass = 'btn-primary';
            vm.CelciusClass = '';
        }
        else {
            vm.FarenheightClass = '';
            vm.CelciusClass = '';
        }
        
        vm.tempUnits = unit;
        activate(vm.data.name, vm.tempUnits);
    }; 
    
    getLocation();
    
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(buildLocationQuery);
        } 
    }
    
    function buildLocationQuery(position) {
        var coords = '&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
        activate(coords, vm.tempUnits);
        vm.show = true;
    }
        
    function activate(q, unit) {            
      getWeather(q, unit);
      getWeeklyForcast(q, unit);
    }        
    
    function getWeather(q, unit){
        
        weatherService.getDailyForcast(q, unit).then(function(response){            
            vm.data = response.data;
            $log.debug('weather', vm.data);                        
        }); 
    }
    
    function getWeeklyForcast(q, unit){
        weatherService.getWeeklyForcast(q, unit).then(function(response){            
            vm.weeklyForcast = response.data.list;
            vm.city = response.data.city;
            $log.debug('weekly Forcast', vm.response);                        
        }); 
    }
  }
})();
