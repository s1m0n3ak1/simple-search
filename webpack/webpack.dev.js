const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: [
      '@babel/polyfill',
      './src/index.js',
    ],
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true, // needed in case we have some deep nested issue on redux router
    hot: true, // hot reloading declared
    // https: true, // we will use it in the future in any case we need
    contentBase: 'dist',
    overlay: true,
    stats: {
      colors: true, // colors on errors and warnings
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(gif|(jp|jpe|pn|sv)g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name]-[hash:6].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          { loader: 'babel-loader' },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=yes',
        'theme-color': '#ff0000',
      },
    }),
  ],
};
