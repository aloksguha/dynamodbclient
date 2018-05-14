angular.module('app.directives.tableContentDirective',[])
    .directive('tableContent',function(){
        return {
            restrict: 'EA',
            templateUrl : 'app/templates/tableContent.html',
            link : function ($scope, element, attrs) {
                console.log("tableContent called.")
            },
            controller : function ($scope){

            }
        };
    });
