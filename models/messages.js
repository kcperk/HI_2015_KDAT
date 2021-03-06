var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  sender    : String,
  receiver  : String,
  date_sent : { type: Date, default: Date.now },
  subject   : String,
  body      : String
})

module.exports = mongoose.model('message', messageSchema);
