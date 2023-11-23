const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const appDirectory = path.resolve(__dirname);
const {presets} = require(`${appDirectory}/babel.config.js`);

const isDebug = process.argv.includes('--mode=development');

const compileNodeModules = [
  // Add every react-native package that needs compiling
  // 'react-native-gesture-handler',
].map(moduleName => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.js$|tsx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(__dirname, 'index.web.js'), // Entry to your application
    path.resolve(__dirname, 'App.web.js'), // Change this to your main App file
    path.resolve(__dirname, 'src'),
    ...compileNodeModules,
  ],
  use: [{
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets,
      plugins: [
        'react-native-web',
        [
          'import',
          { libraryName: 'antd', style: true },
          'antd',
        ],
      ],
    },
  }],
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
    },
  ],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
}

const fileLoaderConfiguration = {
  test: /\.(gif|svg|jpe?g|png)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
}

let plugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'index.html'),
  }),
  // new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    // 'process.env': JSON.stringify(process.env),
    '__DEV__': isDebug,
    'process.env': {
      'NODE_ENV': isDebug ? JSON.stringify('development') : JSON.stringify('production'),
    },
  }),
  new webpack.ProvidePlugin({
    process: 'process/browser',
  }),
  // new CopyPlugin({
  //   patterns: [
  //     {
  //       from: './assets',
  //       to: './assets',
  //     }
  //   ],
  // }),
]

if (isDebug) plugins = [...plugins, new BundleAnalyzerPlugin()]

module.exports = {
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    clean: true,
  },
  optimization: {
    minimize: !isDebug,
    minimizer: [
      new TerserPlugin(),
    ],
    // splitChunks: {
    //   chunks: 'all',
    //   minSize: 10000,
    //   maxSize: 250000,
    // },
  },
  resolve: {
    // modules: ['node_modules'],
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.js',
    ],
    alias: {
      'react-native$': 'react-native-web',
      'screens': path.resolve(__dirname, './src/screens'),
      'components': path.resolve(__dirname, './src/components'),
      'navigators': path.resolve(__dirname, './src/navigators'),
      'layout': path.resolve(__dirname, './src/layout'),
      'styles': path.resolve(__dirname, './src/styles'),
      'images': path.resolve(__dirname, './assets'),
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      fileLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
    ],
  },
  plugins,
  devtool: isDebug ? 'eval' : 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'assets'),
      publicPath: '/assets',
    },
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4321',
        pathRewrite: { '^/api': '' },
      },
    },
  },
}
