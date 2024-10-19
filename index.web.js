// // import {AppRegistry} from 'react-native';
// // import {name as appName} from './app.json';
// // import App from './src/App'
// import React from 'react'
// import App from './src/App'
// if (module.hot) {
//   module.hot.accept()
// }
// // AppRegistry.registerComponent(appName, () => App)
// // AppRegistry.runApplication(appName, {
// //   initialProps: {},
// //   rootTag: document.getElementById('app-root'),
// // })

// // Use the prebuilt version of RNVI located in the dist folder
// // import Icon from 'react-native-vector-icons/Ionicons'

// // Generate the required CSS
// // import iconFont from 'react-native-vector-icons/Fonts/Ionicons.ttf'

// // const iconFontStyles = `@font-face {
// //   src: url(${iconFont}) format('truetype');
// //   font-family: 'Ionicons';
// // }`

// // Create a stylesheet
// // const style = document.createElement('style')

// // Append the iconFontStyles to the stylesheet
// // if (style.styleSheet) {
// //   style.styleSheet.cssText = iconFontStyles
// // } else {
// //   style.appendChild(document.createTextNode(iconFontStyles))
// // }

// // Inject the stylesheet into the document head
// // document.head.appendChild(style)

// import { createRoot } from 'react-dom/client'
// const container = document.getElementById('app-root')
// const root = createRoot(container)
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

import '@expo/metro-runtime'

import { registerRootComponent } from 'expo'

import App from './src/App'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)