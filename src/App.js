import { FixedLayout } from './layout'
import { AppProvider } from './AppContext'

const App = () => (
  <AppProvider>
    <FixedLayout />
  </AppProvider>
)

export default App