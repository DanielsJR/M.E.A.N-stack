var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource',
  'ngRoute',
  'users',
  'example',
  'articles'
]);

mainApplicationModule.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }]);

// Then define the init function for starting up the application
angular.element(document).ready(function() {
  if (window.location.hash === '#_=_') {
    //Fixing facebook bug with redirect
    window.location.hash = '#!';
  } else if(window.location.hash.length === 0) {
    // Without this, after G+ auth we started taking:
    // Uncaught Error: [$location:ihshprfx] Invalid url "https://streetspin.com/#", missing hash prefix "#!"
    // needs to be root caused at some point
    window.location.hash = '#!/';
  }

  //Then init the app
  angular.bootstrap(document, [mainApplicationModuleName]);
});