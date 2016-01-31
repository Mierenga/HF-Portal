/**
* CompanyVotes
* @namespace app.votes.services
*/
(function () {
  'use strict';

  angular
    .module('app.votes.services')
    .service('CompanyVotes', CompanyVotes);

  CompanyVotes.$inject = ['$http', 'CONFIG'];


  /**
  * @namespace CompanyVotes
  */
  function CompanyVotes($http, CONFIG) {

    var rootUrl = CONFIG.SERVICE_URL;

    return {

      get: get,
      create: create,
      destroy: destroy
    };

    /**
     * @name get by company
     * @desc get the votes for a company by user_id)
     */
    function get(user_id) {

      return $http.get(rootUrl + '/api/v1/votes/company/' + user_id);
    }

    /**
     * @name create
     * @desc company votes on a company
     */
     function create(fellow_id, company_id) {
      console.log(fellow_id + ' ' + company_id);
      return $http.post(rootUrl + '/api/v1/votes/company/', {
        fellow_id: fellow_id,
        company_id: company_id
      });
    }

    /**
     * @name destroy
     * @desc destroy a vote record
     */
    function destroy(id) {
      return $http.delete(rootUrl + '/api/v1/votes/company' + id);
    }
  }


})();

