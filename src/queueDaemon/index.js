const fs = require('fs')
const ini = require('ini')
const AmiClient = require('asterisk-ami-client')
const Redis = require('redis')
import Channel from './components/caller'

const config = ini.parse(fs.readFileSync('../config.ini', 'utf-8'))
const AMI = config.ami
const STATUS = 'Status'
const STATUS_COMPLETE = 'StatusComplete'
const ACTION_ID = AMI.actionID || ''

const eventsList = []

const amiClient = new AmiClient({
  reconnect: true,
  keepAlive: true,
  emitEventsByTypes: true,
  emitResponsesById: true
})

amiClient.connect(
  AMI.login,
  AMI.secret,
  {
    host: AMI.host,
    port: AMI.port
  }
)
  .then(() => {
    setInterval(() => amiClient.action({
      Action: STATUS,
      ActionID: ACTION_ID
    }), 2000)
  })
  .catch(error => error)
  .then(error => {
    if (error instanceof Error) throw error
  })

amiClient.on(STATUS, entry => {
  if (entry.ActionID !== ACTION_ID) return
  eventsList.push(new Channel(entry))
})

amiClient.on(STATUS_COMPLETE, entry => {
  if (entry.ActionID !== ACTION_ID) return
  // console.log(JSON.stringify(eventsList))
  const redisClient = Redis.createClient()
  redisClient.on('error', err => console.log(`Error: ${err}`))
  redisClient.set('ChannelList', JSON.stringify(eventsList))
  redisClient.quit()
})
