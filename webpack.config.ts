import { Configuration, ProvidePlugin } from 'webpack'
import { resolve } from 'path'
import HTMLWebpackPlugin from 'html-webpack-plugin'

export default {
  mode: 'development',

  output: {
    path: resolve('dist'),
    publicPath: '',
  },

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@modules': resolve('modules'),
      '@': resolve('src'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },

  entry: ['react-hot-loader/patch', resolve('src/index.ts')],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-react', '@babel/preset-typescript'],
              plugins: [
                [
                  'import',
                  {
                    libraryName: 'antd',
                    style: 'css',
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: resolve('public/index.html'),
      favicon: resolve('public/favicon.png'),
    }),
    new ProvidePlugin({
      React: 'react',
    }),
  ],

  devtool: 'source-map',

  devServer: {
    port: 2200,
    contentBase: resolve('public'),
    hot: true,
    open: false,
    stats: {
      chunks: false,
      modules: false,
      hash: false,
      timings: false,
      assets: false,
      children: false,
      builtAt: false,
      entrypoints: false,
      version: false,
      warnings: false,
    },
  },
} as Configuration
