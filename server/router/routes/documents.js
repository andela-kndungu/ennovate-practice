(function() {
  'use strict';

  var router = require('express').Router(),
    DocumentsController = require('../../controllers/documents');

  // Create a document (POST /documents)
  router.post('/', DocumentsController.create);

  // Fetch document by ID (GET /documents/id)
  router.get('/:id', DocumentsController.find.id);

  // Fetch all documents (GET /documents)
  router.get('/', DocumentsController.find.all);

  // Update document by ID (PUT /documents/id)
  router.put('/:id', DocumentsController.update);

  // Delete document by id (DELETE /documents/id)
  router.delete('/:id', DocumentsController.destroy);

  module.exports = router;
})();
