const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        try {
          new URL(v);
          return true;
        } catch (err) {
          console.debug(`Invalid URL provided: ${v}`);
          return false;
        }
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Video', videoSchema);
