import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FormControl, FormHelperText, InputLabel, Input, Button, Alert } from '@mui/material'


function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [alertMessage, setAlertMessage] = ("")

  const login = async (e) => {
    navigate("/usermainpage", { replace: true })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    login()
  }

  return (
    <div className='profile-container'>
      <div className='form'>
        <div className='form-title'>
          Login
        </div>
        {alertMessage && <Alert variant='filled' severity="error" sx={{width: '100%', }} >{alertMessage}</Alert>}
        <div className='form-item'>
          <FormControl>
            <InputLabel htmlFor='username'>Username</InputLabel>
            <Input
              id="username"
              type='username'
              aria-describedby="username-helper"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormHelperText id="username-helper"></FormHelperText>
          </FormControl>
        </div>
        <div className='form-item'>
          <FormControl>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Input
              id="password"
              type='password'
              placeholder="Password"
              aria-describedby="password-helper"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText id="password-helper">Password must contain a number</FormHelperText>
          </FormControl>
        </div>
        <Button variant='primary'>
          Login
        </Button>
        <Link to="/signup">Don't have an account? Click here to sign up</Link>
      </div>
    </div>
  )
}

export default Login