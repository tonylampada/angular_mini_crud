angular.module('crudapi', ['local_table_storage', 'mockutils']);
angular.module('crudapi').factory('CrudApi', function(LocalTableStorage, MockUtil){
    var api = {
        models: null,
        configure: configure,
        list: list,
        get: get,
        save: save,
        remove: remove,
    };
    
    function configure(options){
      if(options.models){
        api.models = options.models;        
      }
    }

    function list(classname, filters, options){
        var lts = new LocalTableStorage(classname);
        var objs = lts.list(); // Ignora os filtros. Nosso banco nao sabe fazer SELECT
        var entities;
        if(api.models && api.models[classname]){
          entities = objs.map(function(obj){
            return _obj2entity(classname, obj);
          });
        } else {
          entities = objs;
        }
        return MockUtil.mockajax(entities);
    }

    function get(classname, id, options){
        var lts = new LocalTableStorage(classname);
        var obj = lts.get(id);
        return MockUtil.mockajax(_obj2entity(classname, obj));
    }

    function save(classname, obj){
        var lts = new LocalTableStorage(classname);
        obj = lts.save(obj);
        return MockUtil.mockajax(_obj2entity(classname, obj));
    }

    function remove(classname, id){
        var lts = new LocalTableStorage(classname);
        return MockUtil.mockajax(lts.remove(id));
    }
    
    function _obj2entity(classname, obj){
      var entity;
      if(api.models && api.models[classname]){
        entity = new api.models[classname](); // constroi um novo "Pessoa" da vida
        angular.extend(entity, obj); // copia os atributos de obj para entity
      } else {
        entity = obj
      }
      return entity;
    }

    return api;
});
