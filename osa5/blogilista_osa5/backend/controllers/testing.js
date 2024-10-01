const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (req, res) => {
  await Blog.deleteMany({})
  // TODO: Re-enable this if needed,
  // for now its just annoying to recreate new users.. 
  // await User.deleteMany({})

  res.status(204).end()
})

module.exports = router
