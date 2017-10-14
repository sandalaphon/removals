
var webpack = require('webpack');

var config = {
  entry: [
  // 'webpack-hot-middleware/client',
  'babel-polyfill',
  __dirname + '/app.js'
  ],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.css']
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
      },
      // {
      //         test: /\.(jpe?g|png|gif|svg)$/i,
      //         loaders: [
      //             'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
      //             'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
      //         ]
      //     },
      {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loaders: ['file-loader?context=src/images&name=images/[path][name].[ext]', {
                loader: 'image-webpack-loader',
                query: {
                  mozjpeg: {
                    progressive: true,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                  optipng: {
                    optimizationLevel: 4,
                  },
                  pngquant: {
                    quality: '75-90',
                    speed: 3,
                  },
                },
              }],
              exclude: /node_modules/,
              include: __dirname,
            },
      {
              test: /\.css$/,
              use: [
                { loader: "style-loader" },
                { loader: "css-loader" }
              ]
            }
    ]
  }
};

module.exports = config;