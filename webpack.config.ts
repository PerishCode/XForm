import { Configuration, ProvidePlugin } from 'webpack'
import { resolve } from 'path'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

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
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
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
  },
} as Configuration
