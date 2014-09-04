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

        //when query is ran load up the instaGram list
        Instapile.loadUp().then(function() {

            InstaPileList = Instapile.list();


            instaAPI.getTagQuery($scope.queryTerms, max_id).success(function(InstaObject) {

                angular.forEach(InstaObject.data, function(value, key) {
                    angular.forEach(InstaPileList, function(instaValue, key) {
                        if (instaValue.id === value.id) {
                            value.pinned = true;
                        }
                    });
                    //once pin is applied (if it exists) add to scoep array
                    $scope.InstaList.push(value);
                }); //end new array



                //WATCH FOR FURTHER CHANGES on InstaPile Object

                Instapile.list().$watch(function(event) {
                    //get the key of the changed object
                    var changedObj = Instapile.get(event.key);
                    //loop through each instaitem on the screen
                    angular.forEach($scope.InstaList, function(obj, key) {
                        if (obj.id === changedObj.id) {
                            //if match found, make sure you "Pin it" to avoide double data-entry.
                            $scope.InstaList[key].pinned = true;
                        }
                    });
                });


                // END WATCH FOR CHANGES

            })
                .error(function(data) {
                    //erorr if InstaItems don't load
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