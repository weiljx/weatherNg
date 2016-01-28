/* app/components/weatherService/wether.service.js */

(function() {
  'use strict';

  angular
      .module('weather')
      .service('weatherService', weatherService);  

  /** @ngInject */
  function weatherService($q, $http, $log) { // Inject some dependencies   
      
     var dummyData = {
          unit: {
            temp: { symbol: 'F', degree: true },
            precip: { symbol: 'mm' },
            humidity: { symbol: '%' },
            wind: { symbol: 'mph' }
          }          
     };
     
    var apiHost = "http://api.openweathermap.org/"
    // Please go to the website above and register for your own key, it is quick, easy, and free  
    var apiKey = '92746992a90ad66da7b9553b006d6e07';            

    var getTodaysForecast = function() {
        
        // create a deffered so that we can work on the promise before returning it
        var defered = $q.defer();        
        
        // format the url to request data
        var url = apiHost +
                    "data/2.5/weather?q=raleigh" +
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
    
    return {
        getTodaysForecast: getTodaysForecast
    }
  }

})();

/* forecast.controller.js  */

(function() {
  'use strict';

  angular
    .module('weather')
    .controller('ForecastController', ForecastController);

  /** @ngInject */
  function ForecastController($log, weatherService) {  //inject weatherService into the controller
    var vm = this;                 
    
    // call getTodaysForecast on the weatherService            
    weatherService.getTodaysForecast().then(function(response){            
        $log.debug('todaysForecast', response);
        // map the data
        vm.city = response.city;
        vm.main = response.main;
        vm.precip = response.precip;
        vm.humidity = response.humidity;
        vm.wind= response.wind;
        vm.unit= response.unit;                        
    });                         
  }
})();