const express = require('express');
const expressEdge = require('express-edge');
const edge = require('edge.js');
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');

//Controllers
const creeatePostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const aboutPageController = require('./controllers/aboutPage');
const contactPageController = require('./controllers/contactPage');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout');
// Middleware
const storePost = require('./middleware/storePost');
const auth = require('./middleware/auth');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');

const app = new express();
//mongo database
mongoose.connect('mongodb://localhost/node-js-blog');

app.use(connectFlash());
const mongoStore = connectMongo(expressSession)
app.use(expressSession({
  secret: 'secret',
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  })
}));


// public folder as static
app.use(express.static('public'));
app.use(expressEdge);

//File upload function
app.use(fileUpload({ safeFileNames: true }));
// view engine EDGE
app.set('views', `${__dirname}/views`); 

app.use('*', (req, res, next) => {
  edge.global('auth', req.session.userId);
  next();
});

// using bodyParser to pass information from new post form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//register middleware
app.use('/posts/store', storePost)
// app.use('*');
//cotrollers
app.get('/', homePageController);
app.get('/posts/new', auth, creeatePostController);
app.get('/auth/logout', redirectIfAuthenticated, logoutController);
app.post('/posts/store', auth, storePost, storePostController);
app.get('/post/:id', getPostController);
app.get('/about', aboutPageController);
app.get('/contact', contactPageController);
app.get('/auth/login', redirectIfAuthenticated, loginController);
app.get('/auth/register', redirectIfAuthenticated, createUserController);
app.post('/users/register', redirectIfAuthenticated, storeUserController);
app.post('/users/login', redirectIfAuthenticated, loginUserController);

//listen to port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});