require('core-js');
const webpack = require('webpack');
const IS_PROD = process.argv.indexOf('--production') > -1;

module.exports = {
  devtool: IS_PROD ? 'source-map' : 'eval',
  entry: './src/entry.ts',
  output: {
    filename: 'tv-tracker.js'
  },
  module: {
    preLoaders: [{
      test: /\.ts$/, loader: 'tslint?emitErrors=false&failOnHint=false', exclude: /node_modules/
    }],
    loaders: [{
      test: /\.ts$/, loader: 'ts', exclude: /node_modules/
    }, {
      test: /\.scss$/, loader: 'style!css!sass'
    }]
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  devServer: {
    port: 8000,
    inline: true,
    hot: true,
    historyApiFallback: true,
    contentBase: 'src/public'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(IS_PROD ? 'production' : 'development')
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: {
        warnings: false
      }
    })
  ]
};