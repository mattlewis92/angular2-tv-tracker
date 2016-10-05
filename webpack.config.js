const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {

  const extractCSS = new ExtractTextPlugin('tv-tracker.css');

  return {
    devtool: env.production ? 'source-map' : 'eval',
    entry: env.production ? './src/entry.aot.ts' : './src/entry.jit.ts',
    output: {
      filename: 'tv-tracker.js'
    },
    module: {
      rules: [{
        test: /\.ts$/, loader: 'tslint?emitErrors=false&failOnHint=false', exclude: /node_modules/, enforce: 'pre'
      }, {
        test: /\.ts$/, loader: 'awesome-typescript', exclude: path.resolve(__dirname, 'node_modules')
      }, {
        test: /\.scss$/, loader: extractCSS.extract(['css', 'sass'])
      }, {
        test: /\.css$/, loader: extractCSS.extract(['css'])
      }]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    devServer: {
      port: 8000,
      inline: true,
      contentBase: 'src/public'
    },
    plugins: [
      ...(env.production ? [new webpack.optimize.UglifyJsPlugin({sourceMap: true})] : []),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env.production ? 'production' : 'development')
      }),
      extractCSS,
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        __dirname + '/src'
      )
    ]
  };

};