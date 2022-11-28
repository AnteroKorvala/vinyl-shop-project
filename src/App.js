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
import Record from './components/Record'
import Profile from './components/Profile'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
  const jwtStorage = localStorage.getItem("token")
  //const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [userJWT, setUserJWT] = useState(jwtStorage)

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar
          isUserLoggedIn={userJWT != null}
          logout={() => {
            setUserJWT(null)
            localStorage.removeItem("token")
          }}
        />
        <Routes>
          <Route
            path='/'
            element={
              <Feed />
            }
          />
          <Route
            path='/oneVinyl/:id'
            element={
              <Record  />
            }
          />
          <Route
            path='/profile' //when getting id, do /profile/ID
            element={
              <Profile /> // and <Profile id={id} />
            }
          />
          <Route
            path='/login'
            element={
              <Login
                login={(newJWT) => {
                  setUserJWT(newJWT)
                }}
              />
            }
          />
          <Route
            path='/signup'
            element={
              <Signup />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
