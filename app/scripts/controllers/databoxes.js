'use strict';
/*global app */
/**
 * @ngdoc function
 * @name firebaseDemoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the firebaseDemoApp
 */
app.controller('DataBoxCtrl', function($scope, $log, $modal, $firebase, $rootScope, Databox, waitForAuth) {


    /**
    SET DEFAULTS
    **/

    function resetDataBox() {
        $scope.databox = {
            name: '',
            created: '',
            modified: '',
            userId: ''
        }
    };

    $scope.databoxes = [];
    $scope.isLoaded = false;


    /**
    FIREBASE
    **/

    waitForAuth.then(function() {
        Databox.initialLoad().then(function(data) {
            if (data.length === 0) {
                console.log('there are no databoxes');
            };
            $scope.databoxes = data;
            $scope.isLoaded = true;
        });
    });


    $rootScope.$watch('activeDataBox', function(newVal, oldVal) {
        Databox.setActive($id);
    });


    var newDataBoxModal = $modal({
        scope: $scope,
        template: 'views/templates/modal.newDatabox.html',
        show: false
    });


    $scope.showDataBoxModal = function() {
        newDataBoxModal.$promise.then(newDataBoxModal.show);
    };

    $scope.makeActive = function(data) {
        $rootScope.activeDataBox = data;
    };

    $scope.saveDatabox = function() {

        $scope.databox.created = Date.now();
        $scope.databox.modified = Date.now();
        $scope.databox.userId = $rootScope.LoggedUser.id;

        Databox.create($scope.databox).then(function(data) {
            console.log('data from Firebase' + data);
            resetDataBox();
            newDataBoxModal.hide();
        });

    };

    $scope.removeDatabox = function(ref) {
        Databox.delete(ref).then(function(ref) {
            console.log(ref.name());
        })
    };


    resetDataBox();

});