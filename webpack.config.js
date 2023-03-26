const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const appDirectory = path.resolve(__dirname);
const {presets} = require(`${appDirectory}/babel.config.js`);

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
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets,
      plugins: ['react-native-web'],
    },
  },
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
      // exclude: [path.resolve(__dirname, './assets/images/')],
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

module.exports = {
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'iameric.bundle.js',
  },
  resolve: {
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
      screens: path.resolve(__dirname, './src/screens'),
      components: path.resolve(__dirname, './src/components'),
      navigators: path.resolve(__dirname, './src/navigators'),
      layout: path.resolve(__dirname, './src/layout'),
      styles: path.resolve(__dirname, './src/styles'),
      images: path.resolve(__dirname, './assets/images'),
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
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: https://github.com/necolas/react-native-web/issues/349
      __DEV__: JSON.stringify(true),
      // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API_PATH': JSON.stringify(process.env.API_PATH),
      'process.env.PORT': JSON.stringify(process.env.PORT),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/assets',
          to: './assets',
        }
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'assets'),
      publicPath: '/assets',
    },
    proxy: {
      '/api': 'http://localhost:4321',
    }
  }
};
