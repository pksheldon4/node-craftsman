'use strict';

(function() {

    var app = angular.module('app');

    app.controller('KeywordsController', function($scope, RepositoryFactory, resoveEntity){

        /* == Frontend Initialization */
        /* All of this happens as soon as the page loads */
        /* resolveEntity is a helper function which is used in partials/keywordCategoryGridCell.html
           in order to display the name of a keyword category based on its id
         */

        $scope.resolveEntity = resoveEntity;

        /*
            A repository is the connection between this controller and the REST Api.
            We use one for keyword categories...
         */
        var KeywordCategoriesRepository = new RepositoryFactory({
            endpoint: 'keywords/categories',
            retrieveItems: function (data) {
                return data._items;
            }
        });

        var KeywordsRepository = new RepositoryFactory({
           endpoint: 'keywords',
            retrieveItems: function(data) {
               return data._items;
            }
        });

       /* When the frontend loads, we want the controller to immediately load all
          Keyword Categories and Keywords from the API.
        */
       KeywordCategoriesRepository.readAll().then(function (keywordCategories) {
          $scope.keywordCategories = keywordCategories;
       });
        KeywordRepository.readAll().then(function (keywords) {
            $scope.keywords = keywords;
        });
        //Continue from Page 113/114

    });

})();