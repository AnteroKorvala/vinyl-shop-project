import './App.css'
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { ThemeProvider } from '@mui/system'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import theme from './components/Theme'
import Feed from './components/Feed'
import Profile from './components/Profile'

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(true)

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Navbar isUserLoggedIn={userLoggedIn} />
                <Feed />
              </>
            }
          />
          <Route
            path='/profile' //when getting id, do /profile/ID
            element={
              <Profile /> // and <Profile id={id} />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
