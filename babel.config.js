module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    // 'babel-preset-expo',
    // '@babel/preset-env',
    ['@babel/preset-react', {'runtime': 'automatic'}],
  ],
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
          '@app':           './src/AppContext',
          '@navigation':    './src/AppNavigation',
          '@components':    './src/components',
          '@contacts':      './src/components/Contacts',
          '@modal':         './src/components/Modal',
          '@notification':  './src/components/Notification',
          '@socket':        './src/components/Socket',
          '@forms':         './src/components/Forms',
          '@images':        './src/images',
          '@layout':        './src/layout',
          '@screens':       './src/screens',
          '@styles':        './src/styles',
          '@utils':         './src/utils',
        },
      },
    ],
    '@babel/plugin-transform-async-generator-functions',
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-nullish-coalescing-operator',
    '@babel/plugin-transform-object-rest-spread',
    '@babel/plugin-transform-optional-catch-binding',
    '@babel/plugin-transform-optional-chaining',
    '@babel/plugin-transform-export-namespace-from',
    // 'react-native-reanimated/plugin',
  ],
}
