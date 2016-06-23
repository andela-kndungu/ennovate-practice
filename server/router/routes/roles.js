(function() {
  'use strict';

  var router = require('express').Router(),
    RolesController = require('../../controllers/roles');

  // Create a role (POST /roles)
  router.post('/', RolesController.create);

  // Fetch role by ID (GET /roles/id)
  router.get('/:id', RolesController.find.id);

  // Fetch all roles (GET /roles)
  router.get('/', RolesController.find.all);

  // Update role by ID (PUT /roles/id)
  router.put('/:id', RolesController.update);

  // Delete role by id (DELETE /roles/id)
  router.delete('/:id', RolesController.destroy);

  module.exports = router;
})();
