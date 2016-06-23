(function() {
  'use strict';

  module.exports = function(req, document) {
    // User's roles
    var userRoles = req.decoded._doc.roles;

    // Roles which can access the document
    var documentRoles = document.accessibleBy;

    // Check whether the user is authorized to access the document
    for (var i = 0; i < userRoles.length; i++) {
      if (documentRoles.indexOf(userRoles[i]) > -1) {
        return true;
      }
    }
    return false;
  };
})();
