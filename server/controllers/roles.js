(function() {
  'use strict';

  var Roles = require('../models/roles'),
    parseError = require('./parseError');

  module.exports = {
    // Add a new role
    create: function(req, res) {
      // Declare new instance of the Roles model
      var role = new Roles();

      // Define values of the new object to add
      role.title = req.body.title;

      // Save the new role parsing the error if request is invalid
      role.save(function(error) {
        if (error) {
          return parseError(res, error);
        }

        // Role created, return success message
        return res.json({
          success: true,
          message: 'Role created successfully',
          entry: role
        });
      });
    },

    // Handle all get requests for roles
    find: {
      // Retrieve by ID
      id: function(req, res) {
        Roles.findById(req.params.id, function(error, role) {
          // Inform user of errors with the database
          if (error) {
            return res.status(500).json({
              success: false,
              message: 'There was an error reading from the database'
            });
          }

          // Success, return retrieved role with success message
          if (role) {
            return res.json(role);
          }

          // Failed, no role with specified ID
          return res.status(404).json({
            success: false,
            message: 'Role does not exist',
          });
        });
      },

      // Retrieve all roles
      all: function(req, res) {
        // Get all entries in the roles model
        Roles.find({}, function(error, roles) {
          // Inform user of errors with the database
          if (error) {
            return res.status(500).json({
              success: false,
              message: 'There was an error reading from the database'
            });
          }

          // Success, return retrieved roles with success message
          return res.json(roles);
        });
      }
    },

    // Update role by ID
    update: function(req, res) {
      // Get the role to update
      Roles.findById(req.params.id, function(error, role) {
        // Inform user of errors with the database
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'There was an error reading from the database'
          });
        }

        // Role found, update it
        if (role) {
          // For each property sent in the body
          Object.keys(req.body).forEach(function(property) {
            // Update the role
            role[property] = req.body[property];

          });

          // Save the updated role
          role.save(function(error) {
            // Parse any error and pass on to user
            if (error) {
              return parseError(res, error);
            }

            // Role updated, return success message
            return res.json(role);
          });
        } else {
          // Failed, no role with specified ID
          return res.status(404).json({
            success: false,
            message: 'Role does not exist',
          });
        }
      });
    },

    // Delete specified tag
    destroy: function(req, res) {
      // Get user's role from the decoded token
      var usersRoles = req.decoded._doc.roles;
      if (usersRoles.indexOf('admin') > -1) {
        // Find role to delete
        Roles.findByIdAndRemove(req.params.id, function(error, role) {
          // Inform user of errors with the database
          if (error) {
            return res.status(500).json({
              success: false,
              message: 'There was an error reading from the database'
            });
          }

          // Role deleted, return deleted role
          if (role) {
            return res.json(role);
          }

          // Failed, no role with specified ID
          return res.status(404).json({
            success: false,
            message: 'Role does not exist',
          });
        });
      } else {
        // User is not authorised to carry out operaion
        return res.status(403).json({
          success: false,
          message: 'Not authorised to delete a role'
        });
      }
    }
  };
})();
