import { BookProvider } from './context/BookContext'
import AppLayout from './components/AppLayout'

function App() {
  return (
    <BookProvider>
      <AppLayout />
    </BookProvider>
  )
}

export default App