angular.module('myapp', ['local_table_storage']);

angular.module('myapp').controller('MyCtrl', function($scope, LocalTableStorage){
  /**
   * Sim, esse código com um monte de estado e lógica no controller tá cagado.
   * Mas não interessa pq o código abaixo é só pra demonstrar 
   * como usa o LocalTableStorage. Aquele sim, precisa estar bonito.
   */
  
  var tabela_pessoas = new LocalTableStorage('Pessoa');
  var tabela_animais = new LocalTableStorage('Animal');
  
  $scope.add_tony = function(){
    tabela_pessoas.save({
      nome: 'tony',
      idade: 33,
    });
    update_pessoas();
  }
  
  $scope.add_maria = function(){
    tabela_pessoas.save({
      nome: 'maria',
      idade: 47,
    });
    update_pessoas();
  }
  
  $scope.add_loro = function(){
    tabela_animais.save({
      nome: 'Loro José',
      raca: 'papagaio',
    });
    update_animais();
  }
  
  $scope.add_rex = function(){
    tabela_animais.save({
      nome: 'Rex da Silva',
      raca: 'canino',
    });
    update_animais();
  }
  
  function update_pessoas(){
    $scope.pessoas = tabela_pessoas.list();
  }

  function update_animais(){
    $scope.animais = tabela_animais.list();
  }

  update_pessoas();
  update_animais();
})