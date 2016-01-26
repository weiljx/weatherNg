(function() {
  'use strict';

  angular
    .module('weather')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
