var webpack = require('webpack');

var config = {
  entry: [
  // 'webpack-hot-middleware/client',
  __dirname + '/app.js'
  ],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
   // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  node:{
    fs: "empty",
    child_process: "empty"
  },   

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015','stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      }
    ]
  }
};

module.exports = config;