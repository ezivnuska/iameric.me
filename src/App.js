import { ListLayout } from './layout'
import { AppProvider } from './AppContext'

const App = () => (
  <AppProvider>
    <ListLayout />
  </AppProvider>
)

export default App