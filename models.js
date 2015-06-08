angular.module('models', []);
angular.module('models').factory('models', function(Pessoa, Animal){
  /**
   * Um objeto pra registrar os meus modelos de coisas persistentes
   */
  var models = {};
  
  models.Pessoa = Pessoa;
  models.Animal = Animal;
  
  return models;
});

angular.module('models').factory('Pessoa', function(){
  /**
   * Um construtor de pessoas
   */
  function Pessoa(nome, idade){
    this.nome = nome;
    this.idade = idade;
  }
  
  Pessoa.crud_fields = ['id', 'nome', 'idade'];
  
  angular.extend(Pessoa.prototype, {
    aniversario: aniversario
  });
  
  function aniversario(){
    var p = this;
    p.idade++;
  }
  
  return Pessoa;
});

angular.module('models').factory('Animal', function(){
  /**
   * Um construtor de animais
   */
  function Animal(nome, raca){
    this.nome = nome;
    this.raca = raca;
  }

  Animal.crud_fields = ['id', 'nome', 'raca'];
  
  angular.extend(Animal.prototype, {
    corre: corre
  });
  
  function corre(){
    console.log('animal correndo');
  }
  
  return Animal;
});
