const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const expressJwt = require('express-jwt')

const queueRouter = require('./routes/queue')
const userAuth = require('./routes/userauth')

const PORT = process.env.PORT || 3000
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-word'
// const PUBLIC_URLS = [
//   '/userauth',
//   '/'
// ]

const jwtMiddleware = expressJwt({
  secret: JWT_SECRET,
  credentialsRequired: true,
  requestProperty: 'username'
})

class WebServer {

  constructor() {
    this.app = express()
    // this.app.use(jwtMiddleware.unless({
    //   path: PUBLIC_URLS
    // }))

    this.app.use(compression())
    this.app.use(express.static('dist/public'))

    this.app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next()
    })

    this.app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))
    this.app.use(bodyParser.json())

    this.app.locals.jwtSecret = JWT_SECRET

    this.app.use('/queue', jwtMiddleware, queueRouter)
    // this.app.use('/', indexRouter)
    this.app.use('/userauth', userAuth)


    //Error handling
    this.app.use(function (err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        res.status(err.status).send({message: err.message})
        // res.status(err.status).send({message: 'No valid token'})
        return
      }
      next()
    })

  }


  start() {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(PORT, function () {
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

module.exports = WebServer
