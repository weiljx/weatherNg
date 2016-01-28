/* forecast.html */
/*
<!-- Search Bar -->
<div class="row">
    <div class="col-lg-12 col-md-12 col-xs-12">
        <div class="input-group location-group">
            <input id="location" ng-model="vm.location" class="form-control" name="location" placeholder="Location" type="text" value="" />
            <span class="input-group-btn">
                <button class="btn btn-default btn-primary" type="button" ng-click="vm.getForecast()">Get Forecast</button>
            </span>
        </div>        
    </div>
</div>
<!-- End Search Bar -->
*/

/* forecast.controller.js */

(function() {
  'use strict';

  angular
    .module('weather')
    .controller('ForecastController', ForecastController);

  /** @ngInject */
  function ForecastController($log, weatherService) {  //inject weatherService into the controller
    var vm = this;
    vm.location = "Raleigh";  // we set the default location to Raleigh, for an added challenge see if you can use the browsers location to set the default                           
    
    vm.getForecast = function(){
        
        // call getTodaysForecast on the weatherService - notice we now pass a location            
        weatherService.getTodaysForecast(vm.location).then(function(response){            
            $log.debug('todaysForecast', response);
            // map the data
            vm.city = response.city;
            vm.main = response.main;
            vm.precip = response.precip;
            vm.humidity = response.humidity;
            vm.wind= response.wind;
            vm.unit= response.unit;                        
        });   
    };
    
    vm.getForecast();                                 
  }
})();

/* weather.service.js */

// replace this function in the weatherService
var getTodaysForecast = function(query) { // we now take a query parameter
    
    // create a deffered so that we can work on the promise before returning it
    var defered = $q.defer();        
    
    // format the url to request data
    var url = apiHost +
                "data/2.5/weather?q=" + query + // add the query parameter to the url
                "&appid=" + apiKey +
                "&mode=json" +
                "&units=imperial"
    
    $http.get(url).then(function(response){
                    
        $log.debug('raw response', response);
        
        var returnFormat = {};
        
        // if the response is ok then manipulate the data into the desired format (status 200 == ok)
        if(response.status === 200) 
        {                                
            // this format should mimick the previous dummy data
            returnFormat = {
                city: 
                { 
                    name: response.data.name 
                },
                main: 
                {
                    date: new Date(response.data.dt * 1000),
                    dayOrNight: response.data.weather[0].icon.substr(response.data.weather[0].icon.length - 1, 1),
                    description: response.data.weather[0].description,
                    weatherId : response.data.weather[0].id,
                    temp: 
                    {
                        current: response.data.main.temp,
                        min: response.data.main.temp_min,
                        max: response.data.main.temp_max   
                    }                    
                },
                precip: 
                {
                    value: 0
                },
                humidity: 
                {
                    value: response.data.main.humidity
                },
                pressure: 
                {
                    value: response.data.main.pressure
                },
                wind:
                {
                    value: response.data.wind.speed
                },
                unit: dummyData.unit
            };                                                                              
        }                
        
        // return the defered promise
        defered.resolve(returnFormat);                
    });
    
    return defered.promise;
};