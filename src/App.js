import './App.css'
import Navbar from './components/Navbar'
import { ThemeProvider } from '@mui/system'
import theme from './components/Theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
    </ThemeProvider>
  )
}

export default App
