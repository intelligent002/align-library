const mongoose = require('mongoose');

const LibraryItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['youtube', 'link'],
    required: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: String,
    default: 'static-user'
  },
}, { timestamps: true });

module.exports = mongoose.model('LibraryItem', LibraryItemSchema);
