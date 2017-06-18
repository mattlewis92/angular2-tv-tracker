import * as path from 'path';
import * as webpack from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as OfflinePlugin from 'offline-plugin';
import {getIfUtils, removeEmpty} from 'webpack-config-utils';
import {AotPlugin} from '@ngtools/webpack';
import {CheckerPlugin} from 'awesome-typescript-loader';

export default environment => {

  const {ifProduction, ifDevelopment} = getIfUtils(environment);
  const outputFilename = ifProduction('[name]-[chunkhash]', '[name]');
  const extractCSS = new ExtractTextPlugin(`${outputFilename}.css`);
  const PROD_PUBLIC_PATH = '/angular2-tv-tracker/';

  return {
    devtool: ifProduction('source-map', 'eval'),
    entry: './src/entry.ts',
    output: {
      filename: `${outputFilename}.js`,
      publicPath: ifProduction(PROD_PUBLIC_PATH, '/')
    },
    module: {
      rules: removeEmpty([ifDevelopment({
        test: /\.ts$/,
        loader: 'tslint-loader?emitErrors=false&failOnHint=false',
        exclude: /node_modules/,
        enforce: 'pre'
      }), ifProduction({
        test: /\.ts$/,
        loader: '@ngtools/webpack',
        options: {
          compilerOptions: {
            module: 'es2015'
          }
        }
      }, {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader?module=es2015!angular-router-loader',
        exclude: path.resolve(__dirname, 'node_modules')
      }), {
        test: /\.scss$/,
        loader: extractCSS.extract(['css-loader?minimize', 'sass-loader'])
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }])
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    devServer: {
      port: 8000,
      inline: true
    },
    plugins: removeEmpty([
      new CheckerPlugin(),
      ifProduction(new AotPlugin({tsConfigPath: './tsconfig.json'})),
      ifProduction(new webpack.optimize.UglifyJsPlugin({sourceMap: true})),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(environment)
      }),
      extractCSS,
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        __dirname + '/src'
      ),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'main',
        async: true,
        minChunks: 2
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        title: 'Angular 2+ TV tracker'
      }),
      ifProduction(new webpack.optimize.ModuleConcatenationPlugin()),
      ifProduction(new OfflinePlugin({
        ServiceWorker: {
          navigateFallbackURL: PROD_PUBLIC_PATH
        }
      }))
    ])
  };

};