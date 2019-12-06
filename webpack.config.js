const path = require('path')
const nodeExternals = require('webpack-node-externals')
const HtmlWebPackPlugin = require('html-webpack-plugin')
// const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const nodeEnv = process.env.NODE_ENV || 'development'
const isDevelopment = nodeEnv === 'development'

const client = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/client/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/public')
  },
  //plugins
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/client/index.html'
    }),
    new LodashModuleReplacementPlugin({
      'collections': true,
      'paths': true
    })
  ],
  //modules
  module: {
    rules: [
      //CSS
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      //JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['lodash'],
            presets: [
              ['@babel/preset-env', {
                modules: false,
                exclude: [
                  'transform-async-to-generator',
                  'transform-regenerator'
                ]
              }],
              '@babel/preset-react'
            ],
          },
        }
      }
    ]
  },
  //optimization
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: true,
        terserOptions: {
          ecma: 6
        }
      })
    ],
    moduleIds: 'hashed',
    splitChunks: {
      chunks: 'all',
    }
  }
}

const queueDaemon = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/queueDaemon/index.js',
  output: {
    filename: 'queue.daemon.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
}

module.exports = [client, queueDaemon]
