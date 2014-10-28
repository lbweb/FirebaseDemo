'use strict';
/*global app */
/**
 * @ngdoc function
 * @name firebaseDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseDemoApp
 */
app.controller('mapCtrl', function($scope, Auth, Instageo, $log, $rootScope, $firebaseSimpleLogin, $aside) {
  $scope.mapper = {
    center: '-20.851688, 146',
    zoom: 5
  };

  $scope.items = Instageo.all();

  $scope.clicked = function (event, img) {
    $aside({
      title: '',
      content: '<img src="' + img + '">',
      template: '/views/aside/image.tpl.html',
      html: true,
      show: true
    });
  }
});
