/* app/forecast/forecast.html */

/*
<!-- add to bottom of forecast.html -->
<div class="row">
    <div class="col-lg-12 col-md-12 col-xs-12">
        <div class="dailyForcast panel">
            <div class="panel-heading">
                <h3 class="location panel-title">{{vm.city.name}}</h3>
            </div>
            <div class="panel-body">
                <div class="row weeklyWeather">                    
                    <div ng-repeat="forecast in vm.weeklyForecast track by $index" class="weatherSet col-lg-2 col-md-2">
                        <weather-tile weather-model="forecast"></weather-tile>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
*/

/* app/forecast/forecast.controller.js */

// Add this dummy data to the cottom of the forecast controller
var forecast = {
        date: new Date(),
        weather: {
            description: 'Chance of Rain',
            id: '800',
            dayOrNight: 'd'		
        },
        temp: {
            day: 45,
            min: 38,
            max: 49
        },
        pressure: 1014,
        humidity: 54,
        speed: 6,
        units: {
            symbol: 'F',
            humidity: '%',
            wind: 'mph'
        }
};
    
vm.weeklyForecast = [forecast, forecast, forecast, forecast, forecast, forecast];  