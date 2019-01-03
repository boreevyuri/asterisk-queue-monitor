import compression from 'compression'
import express from 'express'

class WebServer {
  constructor() {
    this.app = express()
    this.app.use(compression())
    this.app.use(express.static('dist/public'))
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