const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {

  const extractCSS = new ExtractTextPlugin('tv-tracker.css');

  return {
    devtool: env.production ? 'source-map' : 'eval',
    entry: './src/entry.ts',
    output: {
      filename: 'tv-tracker.js'
    },
    module: {
      preLoaders: [{
        test: /\.ts$/, loader: 'tslint?emitErrors=false&failOnHint=false', exclude: /node_modules/
      }],
      loaders: [{
        test: /\.ts$/, loader: 'awesome-typescript', exclude: /node_modules/
      }, {
        test: /\.scss$/, loader: extractCSS.extract(['css', 'sass'])
      }, {
        test: /\.css$/, loader: extractCSS.extract(['css'])
      }]
    },
    resolve: {
      extensions: ['', '.ts', '.js'],
      mainFields: ['webpack', 'browser', 'web', 'browserify', 'main', 'module']
    },
    devServer: {
      port: 8000,
      inline: true,
      hot: true,
      historyApiFallback: true,
      contentBase: 'src/public'
    },
    plugins: [
      ...(env.production ? [new webpack.optimize.UglifyJsPlugin({sourceMap: true})] : [new webpack.HotModuleReplacementPlugin()]),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env.production ? 'production' : 'development')
      }),
      extractCSS
    ]
  };

};