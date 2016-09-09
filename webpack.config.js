const webpack = require('webpack');

module.exports = env => {

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
        test: /\.ts$/, loader: 'ts', exclude: /node_modules/
      }, {
        test: /\.scss$/, loader: 'style!css!sass'
      }, {
        test: /\.css$/, loader: 'style!css'
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
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env.production ? 'production' : 'development')
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        compress: {
          warnings: false
        }
      })
    ]
  };

};