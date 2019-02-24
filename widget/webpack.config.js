const path = require('path')
const webpack = require('webpack')
const copyWebpackPlugin = require('copy-webpack-plugin')
const { config } = require('dotenv')

if (process.NODE_ENV === 'development') {
  config({ path: path.resolve('..', '.env.development') })
}

const bundleOutputDir = '../static'

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
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.js$/i,
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
