import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FormControl, FormHelperText, InputLabel, Input, Button, Alert } from '@mui/material'
import Axios from 'axios'
import Constants from './Constants.json'


function Login(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [alertMessage, setAlertMessage] = useState(null)

  const login = async (e) => {
    e.preventDefault()
    await Axios.post(Constants.API_ADDRESS + "/u/login", {
      email: email,
      password: password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response)
      if(response.status === 400) setAlertMessage('Invalid credentials')
      else {
        localStorage.setItem("token", response.data.token)
        const receivedJWT = response.data.token
        props.login(receivedJWT)
        navigate('/', { replace: true })
      }
    })
  }

  const submitHandler = (e) => {
    console.log('click')
    e.preventDefault()
    if(email === "") setAlertMessage("Choose a email")
    else if(password === "") setAlertMessage("Choose a password")
    else login(e)
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
            <InputLabel htmlFor='email'>Email</InputLabel>
            <Input
              id="email"
              type='email'
              aria-describedby="email-helper"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText id="email-helper"></FormHelperText>
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
            <FormHelperText id="password-helper"></FormHelperText>
          </FormControl>
        </div>
        <Button variant='contained' onClick={submitHandler}>
          Login
        </Button>
        <Link to="/signup">Don't have an account? Click here to sign up</Link>
        <Link to="/">Return to the front page</Link>
      </div>
    </div>
  )
}

export default Login