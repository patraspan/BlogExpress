module.exports = (req, res, next) => {
  if (!req.files.image || !req.body.username || !req.body.title || !req.body.content ||!req.body.subtitle) {
    return res.redirect('/posts/new')
  }
  next();
}