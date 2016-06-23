(function() {
  'use strict';

  var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  var DocumentsSchema = new Schema({
    ownerId: {
      type: String,
    },

    title: {
      type: String,
      required: [true, 'A title must be provided'],
    },

    content: {
      type: String,
      required: [true, 'Some content must be provided']
    },

    tags: {
      type: Array,
    },

    accessibleBy: {
      type: Array,
      default: []
    }
  }, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  });

  module.exports = mongoose.model('Documents', DocumentsSchema);
})();
