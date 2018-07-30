const mongoose =require('mongoose');

//Definition of schema
const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
});

const Post = mongoose.model('Post', PostSchema)

module.exports = Post