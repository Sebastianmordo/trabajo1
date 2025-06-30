
const express  = require('express')
const passport = require('passport')
const jwt      = require('jsonwebtoken')
const { registerUser, loginUser } = require('../controllers/authController')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login',    loginUser)


router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile','email'],
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session:     false,
    callbackURL: process.env.GOOGLE_CALLBACK_URL  
  }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id, username: req.user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    res.redirect(`http://localhost:3000?token=${token}`)
  }
)

module.exports = router
