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
      //
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

angular.module('crud').factory('CrudModel', function(){
  function CrudModel(model, options){
    this.model = model;
    this.options = options || {};
  }
  
  angular.extend(CrudModel.prototype, {
    show_crud_form: show_crud_form,
  });
  
  function show_crud_form(){
    return false;
  }
  
  return CrudModel;
});
