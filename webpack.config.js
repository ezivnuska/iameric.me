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
  'react-native-vector-icons',
].map(moduleName => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.js$|tsx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(__dirname, 'index.web.js'), // Entry to your application
    path.resolve(__dirname, 'App.web.js'), // Change this to your main App file
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'node_modules/react-native-modal'),
    path.resolve(__dirname, 'node_modules/react-native-'),
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
        'react-native-reanimated/plugin',
      ],
    },
  }],
}

const svgLoaderConfiguration = {
  test: /\.svg$/,
  loader: '@svgr/webpack',
}

const imageLoaderConfiguration = {
  test: /\.(gif|svg|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
}

const fileLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
}

// const styleLoaderConfig = {
//   test: /\.(sa|sc|c)ss$/,
//   use: ['style-loader', 'css-loader', 'sass-loader'],
//   type: 'fonts',
// }

const iconLoaderConfiguration = {
  test: /\.ttf$/,
  loader: 'file-loader',
  include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
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
  //       from: 'src/fonts/style.css',
  //       to: 'fonts/style.css',
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
      '.mjs',
      '.web.tsx',
      '.tsx',
      '.web.ts',
      '.ts',
      '.web.jsx',
      '.jsx',
      '.web.js',
      '.js',
      '.css',
      '.json',
    ],
    alias: {
      'react-native$': 'react-native-web',
      // 'react-native-vector-icons': 'react-native-vector-icons/dist',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      fileLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
      iconLoaderConfiguration,
      // fontLoaderConfiguration,
      // styleLoaderConfig,
    ],
  },
  plugins,
  devtool: isDebug ? 'eval' : 'source-map',
  devServer: {
    // contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3000,
    static: {
      directory: path.resolve(__dirname, 'assets'),
      publicPath: '/assets',
    },
    historyApiFallback: true,
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:4321',
        // pathRewrite: { '^/api': '' },
        // target: 'http://localhost:4321', // Replace with your Express server port
        target: 'http://localhost:4000', // Replace with your Express server port
        secure: false,
        changeOrigin: true,
        // pathRewrite: {
        //     '^/api': '', // Remove '/api' from the request path
        // },
      },
    },
  },
}
