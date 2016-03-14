var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var path = require('path');
var pkg = require('./package.json');
var webpack = require('webpack');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

var common = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Chained Modals Comparison',
      template: 'src/index-template.html',
      inject: 'body'
    })
  ],
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets'),
      path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/fonts')
    ]
  }
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    entry: [
      'webpack-hot-middleware/client',
      APP_PATH
    ],
    output: {
      path: BUILD_PATH,
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass'],
          include: APP_PATH
        },
        {
          test: /\.js$/,
          loaders: ['babel'],
          include: APP_PATH
        }
      ]
    }
  });
}
else if (TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'source-map',
    entry: {
      app: APP_PATH,
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: BUILD_PATH,
      filename: '[name].[chunkhash].js?'
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: false
      }),
      new Clean(['dist']),
      new ExtractTextPlugin('style.[chunkhash].css'),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.CommonsChunkPlugin(
        'vendor',
        '[name].[chunkhash].js'
      )
    ],
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
          include: APP_PATH
        },
        {
          test: /\.js$/,
          loaders: ['babel'],
          include: APP_PATH
        }
      ]
    }
  });
}
