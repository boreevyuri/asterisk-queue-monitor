const path = require('path')
const nodeExternals = require('webpack-node-externals')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const nodeEnv = process.env.NODE_ENV || 'development'
const isDevelopment = nodeEnv === 'development'

const moduleObj = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      include: [process.cwd()],
      use: {
        loader: 'babel-loader',
        options: {
          plugins: [
            ['module:fast-async', {spec: true}],
            '@babel/plugin-proposal-class-properties',
            ['lodash', {id: ['lodash-es']}]
          ],
          presets: [
            ['@babel/preset-env', {
              "modules": false
            }],
            '@babel/preset-react'
          ]
        }
      },
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
    path: path.resolve(__dirname, 'dist')
  },
  module: moduleObj,
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/client/index.html'
    }),
    new LodashModuleReplacementPlugin({
      // shorthands: true
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // })
  ],
  // devServer: {
  //   port: 3030,
  //   contentBase: path.resolve(__dirname, 'dist/public'),
  //   // publicPath: '/',
  //   // compress: true,
  //   // open: true,
  //   open: false,
  //   overlay: {
  //     warnings: true,
  //     errors: true
  //   }
  // },
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ie8: false,
          safari10: false,
          ecma: 6,
          output: {
            comments: false
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'initial'
        }
      }
    }
  }
}

// No reason to pack server side, but...
// const server = {
//   mode: isDevelopment ? 'development' : 'production',
//   entry: {
//     'server': './index.js'
//   },
//   target: 'node',
//   output: {
//     filename: '[name].js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   module: moduleObj,
//   externals: [
//     nodeExternals()
//   ]
// }

// const queueDaemon = {
//   mode: isDevelopment ? 'development' : 'production',
//   entry: {
//     'queue.daemon': './src/queueDaemon/index.js'
//   },
//   target: 'node',
//   output: {
//     filename: '[name].js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   module: moduleObj,
//   externals: [
//     nodeExternals()
//   ]
// }

// module.exports = server
// module.exports = [client, queueDaemon]
module.exports = client
