angular.module('mockutils', []);
angular.module('mockutils').factory('MockUtil', function($q, $timeout){
    /**
     * Lembra do nosso mockutils?
     * Essa aqui eh uma versao mais "anguleira".
     * Pra entender bem esse codigo, dah uma olhada aqui:
     * http://www.dwmkerr.com/promises-in-angularjs-the-definitive-guide/
     */
  
    var mu = {
        mockajax: mockajax,
    };

    function mockajax(result){
        var deferred = $q.defer();
        $timeout(function(){
            deferred.resolve({data: result});
        }, 500);
        _add_success_and_error(deferred.promise);
        return deferred.promise
    }

    function _add_success_and_error(promise){
        promise.success = function(fn) {  
            promise.then(function(response) {
                fn(response.data, response.status, response.headers);
            });
            return promise;
        };

        promise.error = function(fn) {  
            promise.then(null, function(response) {
                fn(response.data, response.status, response.headers);
            });
            return promise;
        };
    }

    return mu;
});
