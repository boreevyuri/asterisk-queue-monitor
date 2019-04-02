const express = require('express')
const redis = require('redis')

const router = express.Router()

router.get('/', (req, res, next) => {
  const redisClient = redis.createClient()
  redisClient.on('error', err => console.log(`Error: ${err}`))
  redisClient.get('Queue', (err, reply) => {
    if (err) throw err
    res.send(JSON.parse(reply))
  })
  redisClient.quit()

})

module.exports = router
