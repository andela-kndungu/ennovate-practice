(function() {
  'use strict';

  var router = require('express').Router(),
    UsersController = require('../../controllers/users');

  // Return the home page (GET /)
  router.get('/', function(req, res) {
    res.json({
      success: true,
      message: 'Api active'
    });
  });

  // Create a user (POST /users)
  router.post('/users', UsersController.create);

  // Log in a user (POST /users/login)
  router.post('/users/login', UsersController.login);

  module.exports = router;
})();
