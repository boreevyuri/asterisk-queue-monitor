const path = require('path')
const nodeExternals = require('webpack-node-externals')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const nodeEnv = process.env.NODE_ENV || 'development'
const isDevelopment = nodeEnv === 'development'

const postcssLoaderPlugins = [
  require('autoprefixer'),
  require('@lipemat/css-mqpacker'),
  require('cssnano')({
    preset: [
      'default', {
        discardComments: {removeAll: true}
      }
    ]
  })
]

const devServer = {
  port: 8080,
  // contentBase: path.resolve(__dirname, 'dist/public'),
  // publicPath: '/',
  open: false,
  overlay: {
    warnings: true,
    errors: true
  }
}

const client = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/client/index.js',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist/public')
  },
  devServer: devServer,
  //plugins
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/client/index.html'
    }),
    new LodashModuleReplacementPlugin({
      'collections': true,
      'paths': true
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  //modules
  module: {
    rules: [
      //CSS
      {
        test: /\.css$/,
        sideEffects: true,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: postcssLoaderPlugins
            }
          }
        ]
      },
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
      cacheGroups: {
        commons: {
          // test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          // name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module.identifier().split('/').reduceRight(item => item);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          chunks: 'all'
        }
      }
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
