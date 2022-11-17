import './App.css'
import Navbar from './components/Navbar'
import { ThemeProvider } from '@mui/system'
import theme from './components/Theme'
import Vinyl from './components/Vinyl'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Vinyl />
    </ThemeProvider>
  )
}

export default App
