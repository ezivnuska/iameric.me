module.exports = {
    projects: [
      {
        preset: 'jest-expo/web',
        transform: {
          '\\.[jt]sx?$': 'babel-jest'
        },
        transformIgnorePatterns: [
          'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)'
        ]
      },
      {
        preset: 'jest-expo/ios',
        transform: {
          '\\.[jt]sx?$': 'babel-jest'
        },
        transformIgnorePatterns: [
          'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)'
        ]
      }
    ]
  }