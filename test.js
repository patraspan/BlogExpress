const mongoose =require('mongoose');

const Post = require('./database/models/Post')
mongoose.connect('mongodb://localhost/test-blog')

Post.create({
  title: 'My first blog post',
  description: 'My first blog desc',
  content: 'My first blog lorem ipsum',
}, (err, post) => {
  console.log(err, post);
})