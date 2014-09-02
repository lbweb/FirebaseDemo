/* jshint camelcase:false */

'use strict';

/**
 * @ngdoc function
 * @name instaViewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the instaViewApp
 */

app.controller('InstaCtrl', function($scope, instaAPI, $log, Instapile, $rootScope, waitForAuth) {

    var counter = 0;
    var globalIteration = 0;

    var InstaPileList = [];



    $scope.InstaList = [];

    $scope.queryTerms = '';
    $scope.showLoading = false;
    $scope.showTagResult = false;


    $scope.currentSearchQuery = 'Insert Search Query';

    var showTagLoading = function() {
        $scope.showLoading = true;
    };

    var showTagResult = function() {
        $scope.showLoading = false;
        $scope.showTagResult = true;
    };

    var runInstaQuery = function(max_id) {

        Instapile.loadUp().then(function() {

            InstaPileList = Instapile.list();

            instaAPI.getTagQuery($scope.queryTerms, max_id).success(function(InstaObject) {


                //LOAD UP CHANGES


                angular.forEach(InstaObject.data, function(value, key) {
                    // console.log('KEY = ' + key);
                    angular.forEach(InstaPileList, function(instaValue, key) {
                        //console.log(instaValue.id);
                        //console.log(value.id);
                        if (instaValue.id === value.id) {
                            value.pinned = true;
                        }
                    });
                    $scope.InstaList.push(value);
                });



                //WATCH FOR FURTHER CHANGES

                Instapile.list().$watch(function(event) {
                    console.log(event);

                    var changedObj = Instapile.get(event.key);

                    angular.forEach(InstaPileList, function(obj, key) {

                        if (obj.id === changedObj.id) {
                            console.log(obj);
                            console.log(changedObj);
                        }
                    });
                });

            })
                .error(function(data) {
                    $log.info(data);
                });

        });
    };




    $scope.isPinned = function(checkId) {

        // angular.forEach($scope.InstaPileList, function(InstaObj) {
        //     console.log(InstaObj);
        //     if (InstaObj.id === checkId) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // });

    }




    $scope.loadResultsBtnClick = function() {
        runInstaQuery($scope.queryTerms);
        console.log($rootScope.LoggedUser);
        console.log($rootScope.activeDataBox);
    };



    $scope.searchEntered = function() {
        $scope.showTagResult = false;
        $scope.queryTerms = $scope.currentSearchQuery;
        showTagLoading();

        instaAPI.getTagCount($scope.queryTerms).then(function(d) {
            $scope.queryResults = d.data.data.media_count;
            showTagResult();
        });
    };



});