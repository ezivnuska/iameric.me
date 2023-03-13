import { Layout } from './layout'
import { AppProvider } from './AppContext'

const App = () => (
  <AppProvider>
    <Layout />
  </AppProvider>
)

export default App