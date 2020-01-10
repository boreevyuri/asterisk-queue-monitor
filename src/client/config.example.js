const config = {}

config.queueUrl = '/queue'

//queue update interval
config.updateInterval = 2000

//refresh page after ms (60000000 == 1 hour)
config.refreshPageInterval = 6000000

//alert when operator has long call
config.alertOperator = 350

config.sortQueuesByActive = false

export default config
