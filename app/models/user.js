const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({

    username : {type : String, required : true, unique : true},
    fullname : {type : String, required : true},
}, { timestamps : true});

userSchema.virtual('post', {
    ref: 'post',
    localField: '_id',
    foreignField: 'user'
  });
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('user', userSchema);