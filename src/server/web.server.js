// import compression from 'compression'
// import express from 'express'

// TODO: learn webpack plugins for mix 'import' with 'require'

const compression = require('compression')
const express = require('express')

// const createError = require('http-errors')
// const path = require('path')
const queueRouter = require('./routes/queue')

class WebServer {
  constructor() {

    this.app = express()
    this.app.use(compression())
    this.app.use(express.static('dist/public'))

    this.app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next()
    })
    this.app.use('/queue', queueRouter)
  }

  start() {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(3000, function () {
          resolve()
        })
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  stop() {
    return new Promise((resolve, reject) => {
      try {
        this.server.close(() => {
          resolve()
        })
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }
}

export default WebServer
// module.exports = WebServer