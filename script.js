angular.module('myapp', ['models', 'crud']);

angular.module('myapp').controller('MyCtrl', function($scope, models){
  $scope.models = models;
  $scope.crud_options = {
    fields_dictionary: {
      id: 'Código',
      nome: 'Nome do indivíduo',
      idade: 'Quantos anos tem',
      raca: 'Raça',
    },
  };
});