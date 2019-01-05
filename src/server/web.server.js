// import compression from 'compression'
// import express from 'express'

// TODO: learn webpack plugins for mix 'import' with 'require'
// TODO: learn how to change 'require' to 'import' correctly

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