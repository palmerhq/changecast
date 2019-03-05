const path = require('path')
const webpack = require('webpack')
const copyWebpackPlugin = require('copy-webpack-plugin')
const { config } = require('dotenv')

config({ path: path.resolve('..', '.env') })

const bundleOutputDir = '../site/static'

module.exports = (env, { mode }) => {
  return [
    {
      entry: './src/widget.js',
      output: {
        filename: 'widget.js',
        path: path.resolve(bundleOutputDir),
      },
      devServer: {
        contentBase: bundleOutputDir,
      },
      optimization: {
        minimize: mode === 'production',
      },
      plugins: [
        new webpack.EnvironmentPlugin(['URL', 'NOW_URL']),
        ...(mode === 'development'
          ? [
              new webpack.SourceMapDevToolPlugin(),
              new copyWebpackPlugin([{ from: './' }]),
            ]
          : []),
      ],
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                },
              },
            ],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/env',
                    {
                      targets: {
                        browsers: ['ie 6', 'safari 7'],
                      },
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    },
  ]
}
