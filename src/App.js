import { AnimatedLayout } from './layout'
import { AppProvider } from './AppContext'

const App = () => (
  <AppProvider>
    <AnimatedLayout />
  </AppProvider>
)

export default App