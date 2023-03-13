// import {AppRegistry} from 'react-native';
// import {name as appName} from './app.json';
import App from './src/App'
if (module.hot) {
  module.hot.accept()
}
// AppRegistry.registerComponent(appName, () => App)
// AppRegistry.runApplication(appName, {
//   initialProps: {},
//   rootTag: document.getElementById('app-root'),
// })

import { createRoot } from 'react-dom/client'
const container = document.getElementById('app-root')
const root = createRoot(container)
root.render(<App />)