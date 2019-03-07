const path = require('path')
const crypto = require('crypto')
const webpack = require('webpack')
const copyWebpackPlugin = require('copy-webpack-plugin')
const { config } = require('dotenv')

config({ path: path.resolve('..', '.env') })

const bundleOutputDir = '../site/static'

const repoHash = crypto
  .createHash(`md5`)
  .update(process.env.GITHUB_REPO_URL)
  .digest(`hex`)

const shortRepoHash = repoHash.substr(repoHash.length - 5)

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
        new webpack.EnvironmentPlugin({
          URL: process.env.URL,
          REPO_HASH: shortRepoHash,
        }),
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
                  hashPrefix: shortRepoHash,
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
