angular.module('myapp', ['crudapi']);

angular.module('myapp').controller('MyCtrl', function($scope, CrudApi){
  /**
   * Sim, esse código com um monte de estado e lógica no controller tá cagado.
   * Mas não interessa pq o código abaixo é só pra demonstrar 
   * como usa o CrudApi. Aquele sim, precisa estar bonito.
   */
  
  $scope.add_tony = function(){
    var tony = {nome: 'Tony Lampada', idade: 33};
    $scope.saving = true;
    CrudApi.save('Pessoa', tony).success(function(){
      $scope.saving = false;
      load_pessoas();
    });
  }
  
  $scope.add_maria = function(){
    var maria = {nome: 'Maria Rita', idade: 19};
    $scope.saving = true;
    CrudApi.save('Pessoa', maria).success(function(){
      $scope.saving = false;
      load_pessoas();
    });
  }
  
  $scope.add_loro = function(){
    var loro = {nome: 'Loiro  Josué', raca: 'arara'};
    $scope.saving = true;
    CrudApi.save('Animal', loro).success(function(){
      $scope.saving = false;
      load_animais();
    });

  }
  
  $scope.add_rex = function(){
    var rex = {nome: 'Rex Pitbull', raca: 'cachorro'};
    $scope.saving = true;
    CrudApi.save('Animal', rex).success(function(){
      $scope.saving = false;
      load_animais();
    });

  }
  
  function load_pessoas(){
    $scope.loading = true;
    CrudApi.list('Pessoa').success(function(pessoas){
      $scope.pessoas = pessoas;
      $scope.loading = false;
    });
  }

  function load_animais(){
    $scope.loading = true;
    CrudApi.list('Animal').success(function(animais){
      $scope.animais = animais;
      $scope.loading = false;
    });
  }

  load_pessoas();
  load_animais();
})