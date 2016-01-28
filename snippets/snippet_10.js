/* weatherTile.html */

/*
<div class="weatherTile">
    <h4 class="time">{{vm.model.date | date : 'EEEE'}}</h4>
    <p class="description">{{vm.model.weather[0].description}}</p>
    <i class="icon owf owf-{{vm.model.weather[0].id}}-{{vm.model.timeOfDay}}" tooltip="{{vm.model.weather[0].description}}"></i>
    <div class="current">
        {{vm.model.temp.day | number:0}}
        <span class="unit">&deg;{{vm.model.units.symbol}}</span>
    </div>
    <div class="minMax"> 
        <div class="btn-group">
            <button type="button" class="btn btn-default" tooltip="Low" class="min">
                {{vm.model.temp.min | number:0}} &deg;{{vm.model.units.symbol}}
            </button>
            <button type="button" class="btn btn-default" tooltip="High" class="max">                                        
                {{vm.model.temp.max | number:0}} &deg;{{vm.model.units.symbol}}
            </button>
        </div>        
    </div>    
    <div class="details hidden-sm hidden-xs">
        <div class="row pressure">
            <div class="col-lg-6 hidden-md">
                <label>Pressure:</label>    
            </div>
            <div class="col-lg-6 col-md-12" tooltip="Pressure">
                {{vm.model.pressure}}
            </div>
        </div>
        <div class="row humid">
            <div class="col-lg-6 hidden-md">
                <label>Humidity:</label>    
            </div>
            <div class="col-lg-6 col-md-12" tooltip="Humidity">
                {{vm.model.humidity | number:0}}{{vm.model.units.himidity}}    
            </div>
        </div>
        <div class="row wind">
            <div class="col-lg-6 hidden-md">
                <label>Wind:</label>    
            </div>
            <div class="col-lg-6 col-md-12" tooltip="Wind">
                {{vm.model.speed | number:0}} {{vm.model.units.wind}}    
            </div>
        </div>
    </div>
</div>
*/

/* weatherTile.scss */

/*

$borderColor: #cccccc;

.weeklyWeather {
    border-top: 1px solid $borderColor;
}
.weatherSet {
    border-right: 1px solid $borderColor;
    
    &:last-of-type {
        border-right: 0;
    }
}
.weatherTile {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    
    .minMax
    {
        margin-bottom: 10px;
    }
    
    .details .row .col-lg-6 
    {        
        &:first-of-type {
            text-align: right;
        }
        &:last-of-type {
            text-align: left;
        }
    }
}

.dailyForcast .panel-body .weatherTile .current {
    top: -10px;
}
@media (min-width: 1200px){
    .weatherTile .details .row .col-lg-6 
    {        
        &:first-of-type {
            text-align: right !important;
        }
        &:last-of-type {
            text-align: left !important;
        }
    }
}

@media (min-width: 992px){
    .weatherTile .details .row .col-md-12 {
        text-align: center !important;
        cursor: pointer; 
    }    
}

@media (max-width: 992px){
    .weatherSet {
        border-bottom: 1px solid $borderColor;
        border-right: 0;
        
        &:last-of-type {
            border-bottom: 0;
        }
    }    
}

*/

/* weatherTile.directive.js */

(function () {
    "use strict";

    angular
        .module('weather')
        .directive("weatherTile", weatherTile);    
    
  /** @ngInject */
  function weatherTile() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/weatherTile/weatherTile.html',
      replace: true,
      scope: {
          model: '=weatherModel'
      },
      controller: weatherTileController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function weatherTileController($log) { 
        var vm = this;                
        $log.debug('vm', vm);        
    }
  }
    
})();
