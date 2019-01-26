const path = require('path')
const nodeExternals = require('webpack-node-externals')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development'
const isDevelopment = nodeEnv === 'development'

const moduleObj = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {

          presets: [

            ['@babel/preset-env', {
              exclude: [
                'transform-async-to-generator',
                'transform-regenerator'
              ],
              loose: true
            }],

            '@babel/preset-react'

          ],

          plugins: [
            ['module:fast-async', {spec: true}],
            "@babel/plugin-proposal-class-properties"
          ]
        }
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}

const client = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    'client': './src/client/index.js'
  },
  target: 'web',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/public')
  },
  module: moduleObj,
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/client/index.html'
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}

// No reason to pack server side, but... babel
const server = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    'server': './src/server/index.js'
  },
  target: 'node',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: moduleObj,
  externals: [
    nodeExternals()
  ]
}

const queueDaemon = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    'queue.daemon': './src/server/queueDaemon/queue.daemon.js'
  },
  target: 'node',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: moduleObj,
  externals: [
    nodeExternals()
  ]
}

module.exports = [client, server, queueDaemon]
// module.exports = client