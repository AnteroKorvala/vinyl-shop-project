import './App.css'
import React, { useState } from 'react'
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
  const [userLoggedIn, setUserLoggedIn] = useState(true)

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar isUserLoggedIn={userLoggedIn} />
        <Feed />
      </Router>
    </ThemeProvider>
  )
}

export default App
