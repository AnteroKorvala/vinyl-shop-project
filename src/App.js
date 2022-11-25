import './App.css'
import Navbar from './components/Navbar'
import { ThemeProvider } from '@mui/system'
import {
  BrowserRouter as Router,
  // Route,
  // Link
} from 'react-router-dom'
import theme from './components/Theme'
import Feed from './components/Feed'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Feed />
      </Router>
    </ThemeProvider>
  )
}

export default App
