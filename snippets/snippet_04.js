/* weather.service.js */

(function() {
  'use strict';

  angular
      .module('weather')
      .service('weatherService', weatherService);  

  /** @ngInject */
  function weatherService() {    
      
     var dummyData = {
          city: { name: 'Gothem' },
          main: {
              date: new Date(),
              description: 'Cold',
              weatherId: '804',
              dayOrNight: 'd',
              temp: { current: 14, min: 12, max: 22 }
          },
          precip: { value: 4 },
          humidity: { value: 36 },
          wind: { value: 17 },
          unit: {
            temp: { symbol: 'F', degree: true },
            precip: { symbol: 'mm' },
            humidity: { symbol: '%' },
            wind: { symbol: 'mph' }
          }          
     };                        
    
    return {
        dummyData: dummyData
    }
  }

})();
