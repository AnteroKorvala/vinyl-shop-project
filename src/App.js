import './App.css'
import Navbar from './components/Navbar'
import { ThemeProvider } from '@mui/system'
import theme from './components/Theme'
import Vinyl from './components/Vinyl'
import Feed from './components/Feed'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Feed />
      <Vinyl />
    </ThemeProvider>
  )
}

export default App
