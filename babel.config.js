module.exports = {
  presets: [
    'babel-preset-expo',
    '@babel/preset-env',
    '@babel/preset-react',
    'module:metro-react-native-babel-preset',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    // [
    //   'expo-camera',
    //   { cameraPermission: 'Allow access your camera.' },
    // ],
    // @babel/plugin-transform-class-properties,
    // @babel/plugin-transform-private-methods,
    // @babel/plugin-transform-private-property-in-object
    // ['@babel/plugin-transform-modules-commonjs', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    [
      'module-resolver',
      {
        alias: {
          '@config':        './config',
          '@app':           './src/AppContext',
          '@bips':          './src/modules/Bipster',
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
          '@layout':        './src/layout',
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
