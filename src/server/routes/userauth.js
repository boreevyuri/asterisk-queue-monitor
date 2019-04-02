const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const mockedUsername = 'admin'
const mockedPassword = 'pass'

router.post('/', (req, res, next) => {
  const {username, password} = req.body
  if (username === mockedUsername && password === mockedPassword) {
    const token = jwt.sign(
      {username},
      req.app.locals.jwtSecret,
      {expiresIn: '60s'}
    )
    res.json(token)
  } else {
    res.status(401).send('Not authorized')
  }
})

module.exports = router
