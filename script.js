angular.module('myapp', ['models', 'crud']);

angular.module('myapp').controller('MyCtrl', function($scope, models){
  $scope.models = models;
  $scope.crud_options = {
    ainda_nao_tem_nenhuma_opcao_aqui: true,
  };

});