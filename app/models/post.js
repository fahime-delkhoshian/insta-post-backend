const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({

  user : {type: Schema.Types.ObjectId, ref: 'user'},
  content : {type : String},
  image : {type : String},
  commentsNumber : {type : Number, default : 0}
}, { timestamps : true});

postSchema.virtual('comment', {
    ref: 'comment',
    localField: '_id',
    foreignField: 'post'
  });
postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('post', postSchema);