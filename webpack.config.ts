import { Configuration, ProvidePlugin } from 'webpack'
import { join, resolve } from 'path'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import { promises } from 'fs'

export default {
  mode: 'development',

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
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
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['svg-url-loader'],
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
    host: '0.0.0.0',
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
    before: async (app: any) => {
      const files = await promises.readdir(join(__dirname, 'mock'))

      for (const file of files) {
        const { default: service } = await import(join(__dirname, 'mock', file))

        Object.keys(service).forEach(key => {
          const [method, api] = key.split(' ')
          app[method.toLowerCase()](api, service[key])
        })
      }
    },
  },
} as Configuration
