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
      $scope.$watch('cm', function(){
        if($scope.cm){
          $scope.cm.list();
        }
      })
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
    this.entity = null;
    this.is_creating = false;
    this.is_editing = false;
    this.is_listing = false;
    this.is_deleting = false;
    this.is_saving = false;
  }
  
  angular.extend(CrudModel.prototype, {
    list: list,
    create: create,
    update: update,
    remove: remove,
    save: save,
    cancel: cancel,
    get_field_name: get_field_name,
    get_field_include: get_field_include,
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
    cm.is_creating = true;
    cm.is_editing = false;
    cm.entity = new cm.model();
  }
  
  function update(){
    var cm = this;
    cm.is_creating = false;
    cm.is_editing = true;
    cm.entity = angular.copy(cm.selected_entity)
  }
  
  function remove(){
    var cm = this;
    cm.is_deleting = true;
    CrudApi.remove(cm.model.name, cm.selected_entity.id).success(function(){
      var index = cm.entities.indexOf(cm.selected_entity);
      cm.entities.splice(index, 1);
      cm.is_deleting = false;
    });
  }
  
  function save(){
    var cm = this;
    cm.is_saving = true;
    CrudApi.save(cm.model.name, cm.entity).success(function(savedentity){
      if(cm.is_creating){
        cm.entities.push(savedentity);
      } else {
        angular.extend(cm.selected_entity, cm.entity);
      }
      cm.is_saving = false;
      cm.entity = null;
      cm.entity_backup = null;
      cm.is_creating = false;
      cm.is_editing = false;
    });
  }
  
  function cancel(){
    var cm = this;
    cm.entity = null;
    cm.entity_backup = null;
    cm.is_creating = false;
    cm.is_editing = false;
  }
  
  function get_field_name(field){
    var cm = this;
    if(cm.options && cm.options.fields_dictionary && cm.options.fields_dictionary[field.name]){
      return cm.options.fields_dictionary[field.name];
    }
    return field;
  }
  
  function get_field_include(field){
    var cm = this;
    return 'crud_field_'+field.type+'.html';
  }
  
  function show_crud_form(){
    var cm = this;
    return cm.is_creating || cm.is_editing;
  }
  
  return CrudModel;
});
