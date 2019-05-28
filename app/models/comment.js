const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({

  post : {type: Schema.Types.ObjectId, ref: 'post'},
  user : {type: Schema.Types.ObjectId, ref: 'user'},
  content : {type : String},
}, { timestamps : true});


module.exports = mongoose.model('comment', commentSchema);