const express = require('express')
const redis = require('redis')
// const {omit} = require('lodash')
const omit = require('lodash/omit')

const router = express.Router()

router.get('/', (req, res, next) => {
  const redisClient = redis.createClient()
  redisClient.on('error', err => console.log(`Error: ${err}`))
  redisClient.get('Queue', (err, reply) => {
    if (err) throw err
    res.send({
      content: omit(JSON.parse(reply)['content'], req.app.locals.blacklist)
    })
  })
  redisClient.quit()

})

module.exports = router
