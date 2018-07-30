const express = require('express');
const expressEdge = require('express-edge');
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');

const app = new express();

mongoose.connect('mongodb://localhost/node-js-blog')

app.use(express.static('public'));
app.use(expressEdge);

app.set('views', `${__dirname}/views`);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/posts/new', (req, res) => {
  res.render('create');
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/post', (req, res) => {
  res.render('post');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});