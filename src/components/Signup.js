import { FormControl, FormHelperText, InputLabel, Input, Button, Alert } from '@mui/material'
import React, {useState} from 'react'
import './Profile.css'
import Axios from 'axios'
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { Link, useNavigate } from "react-router-dom"

function Signup() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [image, setImage] = useState()
  const [alertMessage, setAlertMessage] = ("")

  function AddUser({username, email, password}) {
    console.log('update')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) setAlertMessage("Passwords don't match")
    else AddUser({username, email, password})
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
          Update
        </Button>
        <Link to='/login'>Already have an account? Click here to login</Link>
        <Link to="/">Return to the front page</Link>
      </div>
    </div>
  )
}

export default Signup