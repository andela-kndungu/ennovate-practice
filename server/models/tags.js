(function() {
  'use strict';

  var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  var TagsSchema = new Schema({
    title: {
      type: String,
      required: [true, 'A tag title must be provided'],
      unique: true
    }
  });

  module.exports = mongoose.model('Tags', TagsSchema);
})();
