(function() {
  'use strict';

  angular
    .module(weatherAppName)
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
