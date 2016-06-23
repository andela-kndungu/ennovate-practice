(function() {
  'use strict';

  var router = require('express').Router(),
    TagsController = require('../../controllers/tags');

  // Create a tag (POST /tags)
  router.post('/', TagsController.create);

  // Fetch tag by ID (GET /tags/id)
  router.get('/:id', TagsController.find.id);

  // Fetch all tags (GET /tags)
  router.get('/', TagsController.find.all);

  // Update tag by ID (PUT /cateogries/id)
  router.put('/:id', TagsController.update);

  // Delete tag by id (DELETE /cateogries/id)
  router.delete('/:id', TagsController.destroy);

  module.exports = router;
})();
