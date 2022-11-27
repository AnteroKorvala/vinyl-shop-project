import { FormControl, FormHelperText, InputLabel, Input, Button, Alert } from '@mui/material'
import React, {useState} from 'react'
import './Profile.css'
import Axios from 'axios'
import Constants from './Constants.json'
import { Link, useNavigate } from "react-router-dom"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

function Signup() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [image, setImage] = useState()
  const [alertMessage, setAlertMessage] = useState()
  const navigate = useNavigate()

  const addUser = async () => {
    await Axios.post(Constants.API_ADDRESS + '/u/register', {
      username: username,
      email: email,
      password: password,
      admin: 'false'
    },
    {
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      if(response.status === 201) navigate('/login')
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) setAlertMessage("Passwords don't match")
    //else if(password.length >= 6) setAlertMessage("Password needs to be longer than 6 characters")
    else addUser({username, email, password})
  }

  return (
    <div className='profile-container'>
      <div className='form'>
      <div className='form-profile-icon'>
          {!image && <AccountCircleIcon sx={{fontSize: "5em"}} />}
        </div>
        <FormControl className='form-item'>
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
        <FormControl className='form-item'>
          <InputLabel htmlFor='email'>Email</InputLabel>
          <Input
            id="email"
            type='email'
            aria-describedby="email-helper"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormHelperText id="email-helper">We won't send you unnecessary junk mail</FormHelperText>
        </FormControl>
        <FormControl className='form-item'>
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
        {alertMessage && <Alert variant='filled' severity="error" sx={{width: '100%', }} >{alertMessage}</Alert>}
        <FormControl className='form-item'>
          <InputLabel htmlFor='password'>Confirm password</InputLabel>
          <Input
            id="password"
            type='password'
            placeholder="Confirm password"
            aria-describedby="password-helper"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormHelperText id="password-helper"></FormHelperText>
        </FormControl>
        <Button
          variant='primary'
          type='submit'
          onClick={submitHandler}
        >
          Create User
        </Button>
        <Link to='/login'>Already have an account? Click here to login</Link>
        <Link to="/">Return to the front page</Link>
      </div>
    </div>
  )
}

export default Signup