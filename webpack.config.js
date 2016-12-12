var path = require('path');
var webpack = require('webpack');

var ENV = process.argv.indexOf('--prod') >= 0 ? 'production' : 'development';

module.exports = {
  entry: './src/app',

  output: {
    path: './build/js',
    publicPath: "/js",
    filename: 'bundle.js'
  },

  resolve: {
    root: [
      path.resolve('src'),
      path.resolve('node_modules')
    ],

    extensions: [
      '',
      '.js',
      '.jsx'
    ]
  },

  module: {
    preLoaders:[{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],

    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel'
    }],

    postLoaders: [
    ]
  },

  eslint: {
    configFile: './.eslintrc'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${ENV}"`
    })
  ].concat(ENV === 'production' ? [
    new webpack.BannerPlugin('point-campaign-page-pc' + new Date()),
    new webpack.optimize.UglifyJsPlugin()
  ] : [
    new webpack.HotModuleReplacementPlugin()
  ]),

  devtool: ENV === 'development' ?
    'eval' :
    // 'inline-source-map' :
    undefined,

  devServer: {
    open: true,
    quiet: false,
    noInfo: false,
    inline: true,
    hot: false,
    color: true,
    port: 9000,
    contentBase: './build/',
    // proxy: {
    //   '/': {
    //     target: 'index.html',
    //     secure: false,
    //     bypass: function(req, res, proxyOptions) {
    //       if (!/^\/(build|styleguide)/.test(req.url)) {
    //         return '/build' + req.url;
    //       }
    //       return req.url;
    //     }
    //   }
    // },
    historyApiFallback: false
  }
};
