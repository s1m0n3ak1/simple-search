const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
  entry: {
    main: [
      '@babel/polyfill',
      './src/index.js',
    ],
  },
  mode: 'production',
  output: {
    filename: 'assets/js/[name]-bundle-[hash:8].js',
    chunkFilename: 'assets/js/[name]-bundle-[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devServer: {
    // https: true, // we will use it in the future in any case we need
    historyApiFallback: true,
    contentBase: 'dist',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          cache: true,
          parallel: true,
          sourceMap: true,
          output: {
            comments: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 4,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          { loader: MiniCSSExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(gif|(jp|jpe|pn|sv)g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name]-[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new OptimizeCssAssetsPlugin(),
    new MiniCSSExtractPlugin({
      filename: 'assets/styles/[name]-[hash:8].css',
      chunkFilename: 'assets/styles/[id].[hash:8].css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0, shrink-to-fit=yes',
        'theme-color': '#ff0000',
      },
    }),
    new MinifyPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip',
    }),
    new BrotliPlugin(),
  ],
};
