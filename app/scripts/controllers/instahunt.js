'use strict';

/**
 * @ngdoc function
 * @name instaViewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the instaViewApp
 */

app.controller('InstaCtrl', function($scope, instaAPI, $log) {

    var counter = 0;
    var globalIteration = 0;
    $scope.currentInstaObject = {
        iteration: 0,
        currentData: []
    };

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

        counter++;



        if (counter < 5) {

            //$log.info(counter);


            instaAPI.getTagQuery($scope.queryTerms, max_id).success(function(InstaObject) {

                $scope.currentInstaObject.iteration = globalIteration + 1;

                $log.info(InstaObject);

                angular.forEach(InstaObject.data, function(value) {
                    $scope.currentInstaObject.currentData.push(value);
                });


                if (InstaObject.pagination.next_max_tag_id !== undefined) {

                    runInstaQuery(InstaObject.pagination.next_max_tag_id);
                } else {

                    $log.info('succesfully ended');
                }



            })
                .error(function(data) {
                    $log.info(data);
                });
        }
    };



    $scope.loadResultsBtnClick = function() {
        runInstaQuery($scope.queryTerms);
    }




    $scope.searchEntered = function() {
        $scope.showTagResult = false;
        $scope.queryTerms = $scope.currentSearchQuery;
        showTagLoading();

        instaAPI.getTagCount($scope.queryTerms).then(function(d) {
            $scope.queryResults = d.data.data.media_count;
            showTagResult();
        });
    }



});