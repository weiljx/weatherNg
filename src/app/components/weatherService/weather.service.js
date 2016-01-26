(function() {
  'use strict';

  angular
      .module(weatherAppName)
      .service('weatherService', weatherService);  

  /** @ngInject */
  function weatherService($http, $q) {    
      
    var apiHost = "http://api.openweathermap.org/"  
    var apiKey = '92746992a90ad66da7b9553b006d6e07';            

    var getDailyForcast = function(q, unit) {
        
        var defered = $q.defer();        
        
        if(validateParameters())
        {          
            var units = getUnits(unit);
            var url = apiHost +
                      "data/2.5/weather?q=" + q +
                      "&appid=" + apiKey +
                      "&mode=json" +
                      "&units=" + units.value
            
            $http.get(url).then(function(response){
                
                if(response.status === 200)
                {           
                    response.data.units = units;         
                    response.data.date = new Date(response.data.dt * 1000);
                    response.data.timeOfDay = response.data.weather[0].icon.substr(response.data.weather[0].icon.length - 1, 1);
                
                    if(response.data.precipitation == undefined){
                        response.data.precipitation = {
                            value: 0,
                            mode: 'none'   
                        };                
                    }   
                }                
                
                defered.resolve(response);                
            });
        }
        
        return defered.promise;
    };
    
    var getWeeklyForcast = function(q, unit){
        
        var defered = $q.defer();        
        
        if(validateParameters()){
            var count = 7;            
            var units = getUnits(unit);
            var url = apiHost +
                      "data/2.5/forecast/daily?q=" + q +
                      "&appid=" + apiKey +
                      "&mode=json" +
                      "&units=" + units.value + 
                      "&cnt=" + count;            
            
            $http.get(url).then(function(response){                
                
                if(response.status === 200)
                {
                    response.data.units = units;
                    
                    var list = response.data.list;
                    var dataList = [];
                    
                    for(var i = 1; i < list.length; i++){
                        var listItem = list[i];
                        listItem.units = units;
                        listItem.date = new Date(listItem.dt * 1000);
                        listItem.timeOfDay = listItem.weather[0].icon.substr(listItem.weather[0].icon.length - 1, 1);
                        dataList.push(listItem)
                    }
                    
                    response.data.list = dataList;
                }                
                
                defered.resolve(response);                
            });
        }
        
        return defered.promise;
    };
    
    var validateParameters = function(){
        var valid = true;
        
        if(valid && !(apiKey.length > 0)){
            valid = false;   
        }        
        
        return valid;
    };    
    
    var getUnits = function(unit){
        var unitSystem = {
            name: 'Kelvin',
            symbol: 'K',
            value: 'default',
            wind: 'm/s',
            humidity: '%',
            pressure: 'hPa',
            precip: 'mm'
        };
        
        if(unit.toLowerCase() === 'f'){
            unitSystem = {
                name: 'Farenheight',
                symbol: 'F',
                value: 'imperial',
                wind: 'mph',
                humidity: '%',
                pressure: 'hPa',
                precip: 'mm'
            };
        } 
        else if(unit.toLowerCase() == 'c'){
            unitSystem = {
                name: 'Celcius',
                symbol: 'C',
                value: 'metric',
                wind: 'm/s',
                humidity: '%',
                pressure: 'hPa',
                precip: 'mm'
            };
        }
                
        return unitSystem;
    };
    
    return {
        getDailyForcast: getDailyForcast,
        getWeeklyForcast: getWeeklyForcast
    }
  }

})();
