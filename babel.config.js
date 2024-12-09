module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@react-native/babel-preset',
    'babel-preset-expo',
    '@babel/preset-typescript',
    // 'module:metro-react-native-babel-preset',
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
    ['@babel/plugin-transform-runtime', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@config':        './config',
          '@app':           './src/context/AppContext',
          // '@bips':          './src/modules/Bipster',
          '@components':    './src/components',
          '@context':      './src/context',
          '@feed':          './src/context/FeedContext',
          // '@mail':          './src/components/Mail',
          '@modal':         './src/context/Modal',
          '@notification':  './src/context/Notification',
          // '@play':          './src/context/Play',
          '@socket':        './src/context/SocketContext',
          '@form':          './src/context/FormContext',
          // '@forms':         './src/modules/Form/forms',
          // '@images':        './src/components/Images',
          '@layout':        './src/layout',
          // '@modules':       './src/modules',
          '@screens':       './src/screens',
          '@sounds':        './sounds',
          '@styles':        './src/styles',
          '@user':          './src/context/UserContext',
          '@utils':         './src/utils',
        },
      },
    ],
    ['react-native-reanimated/plugin', { loose: true }],
    ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
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
