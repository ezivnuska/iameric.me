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
    ['@babel/plugin-transform-private-property-in-object', { 'loose': true }],
    [
      'module-resolver',
      {
        alias: {
          '@app':           './src/AppContext',
          '@components':    './src/components',
          '@contacts':      './src/modules/Contacts',
          '@forum':         './src/modules/Forum',
          '@mail':          './src/modules/Mail',
          '@modal':         './src/modules/Modal',
          '@notification':  './src/modules/Notification',
          '@socket':        './src/modules/Socket',
          '@form':          './src/modules/Form',
          '@forms':         './src/modules/Form/forms',
          '@images':        './src/modules/Images',
          '@modules':       './src/modules',
          '@screens':       './src/screens',
          '@styles':        './src/styles',
          '@utils':         './src/utils',
        },
      },
    ],
    // '@babel/plugin-transform-async-generator-functions',
    // '@babel/plugin-transform-class-properties',
    // '@babel/plugin-transform-nullish-coalescing-operator',
    // '@babel/plugin-transform-object-rest-spread',
    // '@babel/plugin-transform-optional-catch-binding',
    // '@babel/plugin-transform-optional-chaining',
    // '@babel/plugin-transform-export-namespace-from',

    // 'react-native-reanimated/plugin',
  ],
}
