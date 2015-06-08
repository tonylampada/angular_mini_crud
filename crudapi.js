angular.module('crudapi', ['local_table_storage', 'mockutils']);
angular.module('crudapi').factory('CrudApi', function(LocalTableStorage, MockUtil){
    var api = {
        list: list,
        get: get,
        save: save,
        remove: remove,
    };

    function list(classname, filters, options){
        var lts = new LocalTableStorage(classname);
        // Ignora os filtros. nosso banco nao sabe fazer SELECT
        return MockUtil.mockajax(lts.list());
    }

    function get(classname, id, options){
        var lts = new LocalTableStorage(classname);
        return MockUtil.mockajax(lts.get(id));
    }

    function save(classname, obj){
        var lts = new LocalTableStorage(classname);
        return MockUtil.mockajax(lts.save(obj));
    }

    function remove(classname, id){
        var lts = new LocalTableStorage(classname);
        return MockUtil.mockajax(lts.remove(id));
    }

    return api;
});
