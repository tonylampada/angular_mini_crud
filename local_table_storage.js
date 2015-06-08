// conhece o localStorage?
// ó: http://zenorocha.com/html5-local-storage/

angular.module('local_table_storage', []);
angular.module('local_table_storage').factory('LocalTableStorage', function(){
  
    /**
     * Objeto pra fazer persistencia de uma lista de objetos no localStorage.
     * Na nossa série de plunkers, a gente vai fazer de conta que isso é o nosso backend.
     */
    function LocalTableStorage(tablename){
        this.tablename = tablename;
    }

    angular.extend(LocalTableStorage.prototype, {
        save: save,
        remove: remove,
        get: get,
        list: list,
    });

    function save(obj){
        var lts = this; //quanto menos this no codigo melhor.
        var registros = _registros(lts.tablename);
        var edited = false;
        if(obj.id !== undefined){
            var index = _find_index(registros, obj.id);
            if(index >= 0){
                registros[index] = obj;
                edited = true;
            }
        }
        if(!edited){
            if(obj.id === undefined){
                obj.id = _random_id();
            }
            registros.push(obj);
        }
        localStorage.setItem(lts.tablename, JSON.stringify(registros));
        return angular.copy(obj);
    }

    function remove(id){
        var lts = this;
        var registros = _registros(lts.tablename);
        var index = _find_index(registros, id);
        if(index >=0){
            registros.splice(index, 1);
        }
        localStorage.setItem(lts.tablename, JSON.stringify(registros));
    }

    function get(id){
        var lts = this;
        var registros = _registros(lts.tablename);
        var index = _find_index(registros, id);
        return index >=0 ? registros[index] : null;
    }

    function list(){
        var lts = this;
        var registros = _registros(lts.tablename);
        return registros;
    }

    function _find_index(registros, id){
        for(var i=0; i<registros.length; i++){
            var registro = registros[i];
            if(id === registro.id){
                return i;
            }
        }
        return -1;
    }

    function _random_id(){
        return Math.floor(Math.random() * 1E9);
    }

    function _registros(key){
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    return LocalTableStorage;
});
