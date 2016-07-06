/**
 * register module
 */

(function () {
  'use strict';

  angular
    .module('app.register', [
        'app.register.controllers',
        //'app.register.services'
        ]);

  //declare the controllers module
  angular
    .module('app.register.controllers', []);

  //declare the directives module
  angular
    .module('app.register.directives', []);
})();
