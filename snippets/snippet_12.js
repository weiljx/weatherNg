/* weather.service.js */

// add this method to the service and expose it
var getWeeklyForecast = function(query){
	
	var defered = $q.defer();        
	
	var url = apiHost +
				"data/2.5/forecast/daily?q=" + query +
				"&appid=" + apiKey +
				"&mode=json" +
				"&units=imperial" + 
				"&cnt=7";            
	
	$http.get(url).then(function(response){                
		
		var dataList = [];
		
		if(response.status === 200)
		{                    
			var list = response.data.list;                    
			
			for(var i = 1; i < list.length; i++){
				var listItem = list[i];
				listItem.units = dummyData;
				listItem.date = new Date(listItem.dt * 1000);
				listItem.weather = {
					description: list[i].weather[0].description,
					id: list[i].weather[0].id,
					dayOrNight: list[i].weather[0].icon.substr(list[i].weather[0].icon.length - 1, 1)
				}
				dataList.push(listItem)
			}
			
			response.data.list = dataList;
		}                
		
		defered.resolve(dataList);                
	});

	return defered.promise;

};

/* forecast.controller.js */

// Add this at the end of the getForecast() method
weatherService.getWeeklyForecast(vm.location).then(function(response){
	$log.debug('weeklyForcast', response);
	vm.weeklyForecast = response;
});