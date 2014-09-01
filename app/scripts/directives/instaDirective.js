/* jshint camelcase:false*/
/* global Firebase */
'use strict';


app.directive('instaDirective', function() {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            post: "=data"
        },
        templateUrl: '../../views/templates/directive.instaDirective.html',
        link: function(scope, elem, attrs) {
            scope.pinIt = function(id) {
                scope.currentInstaObject.currentData[id].pinned = true;
                var tempObj = angular.copy($scope.currentInstaObject.currentData[id]);

                Instapile.add(tempObj).then(function(data) {
                    console.log(data);
                });
            };
        }
    }
});