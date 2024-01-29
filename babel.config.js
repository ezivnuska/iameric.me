module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          '@components': './src/components',
          '@images': './src/images',
          '@layout': './src/layout',
          '@navigators': './src/navigators',
          '@screens': './src/screens',
          '@utils': './src/utils',
        },
      },
    ],
  ],
}
