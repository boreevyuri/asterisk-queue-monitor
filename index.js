const WebServer = require('./src/server')

let webServer = new WebServer()
webServer.start()
.then(() => {
  console.log('Web server started!')
})
.catch(err => {
  console.error(err)
  console.error('Failed to start web server')
})
