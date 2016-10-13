const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FixDefaultImportPlugin = require('webpack-fix-default-import-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {

  const extractCSS = new ExtractTextPlugin('tv-tracker.css');

  return {
    devtool: env.production ? 'source-map' : 'eval',
    entry: env.production ? './src/entry.aot.ts' : './src/entry.jit.ts',
    output: {
      filename: 'tv-tracker.js',
      publicPath: env.production ? '/tv-tracker/' : '/'
    },
    module: {
      rules: [{
        test: /\.ts$/,
        loader: 'tslint-loader?emitErrors=false&failOnHint=false',
        exclude: /node_modules/,
        enforce: 'pre'
      }, {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader!angular2-router-loader?loader=system&genDir=./aot/src/app' + (env.production ? '&aot=true' : ''),
        exclude: path.resolve(__dirname, 'node_modules')
      }, {
        test: /\.scss$/,
        loader: extractCSS.extract(['css-loader', 'sass-loader'])
      }]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    devServer: {
      port: 8000,
      inline: true
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
      ),
      new FixDefaultImportPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'main',
        async: true,
        minChunks: 2
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        title: 'Angular 2 TV tracker'
      })
    ]
  };

};