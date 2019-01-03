const client = {
  entry: {
    'client': './src/client/index.js'
  }
}

const server = {
  entry: {
    'server': './src/server/index.js'
  }
}

module.exports = [client, server]