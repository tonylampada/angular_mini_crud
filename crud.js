angular.module('crud', ['crudapi']);

angular.module('crud').directive('crud', function(){
  return {
    restrict: 'E',
    scope: {
      model: '=',
      options: '=',
    },
    templateUrl: 'crud.html',
    controller: function($scope, CrudModel){
      $scope.cm = undefined;

      $scope.$watchGroup(['model', 'options'], function(){
        if($scope.model){
          $scope.cm = new CrudModel($scope.model, $scope.options);
        }
      });
    }
  };
});

angular.module('crud').directive('crudGrid', function(){
  return {
    restrict: 'E',
    scope: {
      cm: '=',
    },
    templateUrl: 'crud_grid.html',
    controller: function($scope){
      $scope.cm.list();
    }
  };
});

angular.module('crud').directive('crudForm', function(){
  return {
    restrict: 'E',
    scope: {
      cm: '=',
    },
    templateUrl: 'crud_form.html',
    controller: function($scope){
      //
    }
  };
});

angular.module('crud').factory('CrudModel', function(CrudApi){
  function CrudModel(model, options){
    this.model = model;
    this.options = options || {};
    this.entities = [];
    this.is_listing = false;
    this.is_deleting = false;
  }
  
  angular.extend(CrudModel.prototype, {
    list: list,
    create: create,
    update: update,
    remove: remove,
    show_crud_form: show_crud_form,
  });
  
  function list(){
    var cm = this;
    cm.is_listing = true;
    CrudApi.list(cm.model.name).success(function(entities){
      cm.is_listing = false;
      cm.entities = entities;
    });
  }
  
  function create(){
    var cm = this;
    //TODO
  }
  
  function update(){
    var cm = this;
    //TODO
  }
  
  function remove(){
    var cm = this;
    cm.is_deleting = true;
    CrudApi.remove(cm.selected_entity.id).success(function(){
      var index = cm.entities.indexOf(cm.selected_entity);
      cm.entities.splice(index, 1);
      cm.is_deleting = false;
    });
  }
  
  function show_crud_form(){
    return false;
  }
  
  return CrudModel;
});
