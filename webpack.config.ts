import * as path from 'path';
import * as webpack from 'webpack';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as OfflinePlugin from 'offline-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import { AngularCompilerPlugin } from '@ngtools/webpack';

export default (environment: string) => {
  const { ifProduction, ifDevelopment } = getIfUtils(environment);
  const outputFilename = ifProduction('[name]-[chunkhash]', '[name]');
  const PROD_PUBLIC_PATH = '/angular2-tv-tracker/';

  return {
    mode: environment,
    entry: './src/entry.ts',
    output: {
      path: __dirname,
      filename: `${outputFilename}.js`,
      publicPath: ifProduction(PROD_PUBLIC_PATH, '/')
    },
    module: {
      rules: removeEmpty([
        ifDevelopment({
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: /node_modules/,
          enforce: 'pre',
          options: {
            emitErrors: false,
            failOnHint: false
          }
        }),
        ifProduction(
          {
            test: /\.ts$/,
            loader: '@ngtools/webpack'
          },
          {
            test: /\.ts$/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  compilerOptions: {
                    module: 'es2015'
                  }
                }
              },
              {
                loader: 'angular-router-loader'
              }
            ],
            exclude: path.resolve(__dirname, 'node_modules')
          }
        ),
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader?minimize',
            'sass-loader'
          ]
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        },
        {
          test: /node_modules\/@angular\/core\/.+\/core\.js$/,
          parser: {
            system: true // disable `System.import() is deprecated and will be removed soon. Use import() instead.` warning
          }
        }
      ])
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    devServer: {
      port: 8000,
      inline: true
    },
    plugins: removeEmpty([
      ifDevelopment(new ForkTsCheckerWebpackPlugin()),
      ifProduction(
        new AngularCompilerPlugin({
          tsConfigPath: './tsconfig-aot.json'
        })
      ),
      new MiniCssExtractPlugin({
        filename: `${outputFilename}.css`
      }),
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)fesm5/,
        __dirname + '/src'
      ),
      new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        title: 'Angular 2+ TV tracker',
        chunksSortMode: 'none'
      }),
      ifProduction(
        new OfflinePlugin({
          ServiceWorker: {
            navigateFallbackURL: PROD_PUBLIC_PATH
          }
        })
      )
    ]),
    optimization: {
      splitChunks: ifProduction(
        {
          chunks: 'all',
          automaticNameDelimiter: '.'
        },
        false
      ),
      runtimeChunk: ifProduction(true, false),
      removeAvailableModules: ifProduction(true, false), // disable tree shaking in dev mode for faster rebuilds
      removeEmptyChunks: ifProduction(true, false)
    }
  };
};
