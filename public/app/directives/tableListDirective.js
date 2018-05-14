/**
 * Created by alokguha on 03/10/16.
 */
angular.module('app.directives.tableListDirective',[])
    .directive('tableList',['$http', function(){
        return {
            restrict: 'EA',
            templateUrl : 'app/templates/tableList.html',
            link : function ($scope, element, attrs) {
                console.log("tableList called.")
            },
            controller : function ($scope, $http){
                $scope.isTableContent = false;
                $scope.tableListTree = [];
                $scope.colKeys = [];
                $scope.selectedTable = undefined;
                $scope.tableContent = [];
                $http({method: 'GET', url:'/tables'}).then(function (result) {
                    console.log(result);
                    if(result && result.data){
                        $scope.tableListTree = result.data.TableNames;
                    }                              
                 }, function (result) {
                     alert("Error: No data returned");
                 });


                 $scope.$watch('selectedTable', function (newVal, oldVal) {
                    console.log(newVal, oldVal)
                    if(newVal){
                        // angular.element('#tableList' + newVal).addClass("active");
                    } 
                    if(oldVal){

                    }
                    // angular.element('#id_' + newVal[0].owner.login +'_'+newVal[0].id)
                    // if (oldVal === undefined && newVal && newVal.length > 0) {
                    //   $timeout(function () {
                    //     angular.element('#id_' + newVal[0].owner.login +'_'+newVal[0].id).triggerHandler('click');
                    //   });
                    // }else if(newVal && newVal.length === 0){
                    //   $scope.norepo = true;
                    // }
                  });


                 $scope.onSelectTable = function (tableName) {
                    console.log('onSelectTable called !!'); 
                   // if(tableName){
                        $scope.selectedTable = tableName;
                   // }
                    $scope.tableContent = [];
                   
                    $scope.isTableContent = false;
                    //alert(tableName)
                    $scope.colKeys = [];
                    $http({method: 'GET', url:'/tables/'+tableName}).then(function (result) {
                        console.log(result);
                        if(result && result.data){
                            $scope.tableContent = result.data.Items;
                        }                    
                        if($scope.tableContent && $scope.tableContent.length > 0){
                            $scope.isTableContent = true;
                            for(var k in $scope.tableContent[0]) $scope.colKeys.push(k);
                        }          
                     }, function (result) {
                         alert("Error: No data returned");
                     });

                 }
            }
        };
    }]);
