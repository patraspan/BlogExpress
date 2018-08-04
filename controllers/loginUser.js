const User = require('../database/models/User');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
  const { email, password }= req.body;
  //find user
  User.findOne({ email }, (error, user) => {
    if (user) {
        //compare user password 
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          //store user session
          req.session.userId = user._id
          res.redirect('/')
        } else {
            //if user pass is correct then login
          res.redirect('/auth/login')
        }
      });
    } else {
      return res.redirect('/auth/login')
    }
  });

  }