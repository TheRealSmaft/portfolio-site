const { resolve } = require('path');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: [
      // 'react-hot-loader/patch',
  
      // 'webpack-dev-server/client?http://localhost:8080',
  
      // 'webpack/hot/only-dev-server',
  
      './index.js'
    ],
    vendors: ['react', 'redux', 'react-dom', 'lodash', 'react-router', 'react-redux', './plugins/bodymovin.min.js']
  },

  output: {
    filename: '[name].bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  context: resolve(__dirname, 'app'),

  // devtool: 'eval-source-map',

  // devServer: {
  //   hot: false,
    
  //   historyApiFallback: true,

  //   compress: true,

  //   contentBase: resolve(__dirname, 'dist'),

  //   publicPath: '/'
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        },
      },
      {
        test: /\.(psd|ai|aep)$/,
        loader: 'ignore-loader'
      }
    ],
  },

  plugins: [
    // new webpack.HotModuleReplacementPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: "vendors",
      minChunks: Infinity,
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),

    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|html|css|json|png|svg)$/,
      threshold: 10240,
      minratio: 0.8
    }),

    new UglifyJSPlugin({
      mangle: false
    }),
  ],
};