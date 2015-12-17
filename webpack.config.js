const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: './src/entry.ts',
  output: {
    filename: 'tv-tracker.js'
  },
  module: {
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
    new webpack.HotModuleReplacementPlugin()
  ]
};