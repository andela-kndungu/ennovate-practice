(function() {
  'use strict';

  var bcrypt = require('bcrypt-nodejs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Roles = require('../models/roles');


  var UserSchema = new Schema({
    username: {
      type: String,
      required: [true, 'A username must be provided'],
      unique: true
    },

    name: {
      first: {
        type: String,
        required: [true, 'A first name must be provided']
      },
      last: {
        type: String,
        required: [true, 'A last name must be provided']
      }
    },

    email: {
      type: String,
      required: [true, 'An email must be provided'],
      unique: true
    },

    password: {
      type: String,
      required: [true, 'A password must be provided']
    },

    roles: {
      type: Array,
      default: ['user']
    }
  }, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  });

  UserSchema.pre('save', function(next) {
    // To be able to access the user object from within the bcrypt function
    var user = this;

    // Replace provided plain text password with hashed one
    bcrypt.hash(user.password, null, null, function(error, hashedPassword) {
      if (error) {
        var err = new Error('something went wrong');
        next(err);
      } else {
        user.password = hashedPassword;
        next();
      }
    });
  });

  // Validate hashed password
  UserSchema.methods.validatePassword = function(providedPassword, callback) {
    // To be able to access the object from within the bcrypt function
    var user = this;
    bcrypt.compare(providedPassword, user.password, function(error, isMatch) {
      if (error) {
        return callback(error);
      }
      callback(null, isMatch);
    });
  };

  module.exports = mongoose.model('Users', UserSchema);
})();
