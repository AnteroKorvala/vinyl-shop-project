import { FormControl, FormHelperText, InputLabel, Input, Button, Alert } from '@mui/material'
import React, {useState} from 'react'
import './Profile.css'
import Axios from 'axios'
import Constants from './Constants.json'
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

function Profile() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [alertMessage, setAlertMessage] = useState()
  const [image, setImage] = useState()

  const updateProfile = async ({username, email, password}) => {
    await Axios.put(Constants.API_ADDRESS + '/u/updateUser', {
      username: username,
      email: email,
      password: password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      console.log(response.status)
      alertMessage('Nice')
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) setAlertMessage("Passwords don't match")
    updateProfile({username, email, password})
  }

  return (
    <div className='profile-container'>
      <div className='form-profile'>
        <div className='form-profile-icon'>
          {!image && <AccountCircleIcon sx={{fontSize: "5em"}} />}
        </div>
        <FormControl className='form-item'>
          <InputLabel htmlFor='username'></InputLabel>
          <Input
            id="username"
            type='username'
            aria-describedby="username-helper"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormHelperText id="username-helper">Edit your username</FormHelperText>
        </FormControl>
        <FormControl className='form-item'>
          <InputLabel htmlFor='email'></InputLabel>
          <Input
            id="email"
            type='email'
            aria-describedby="email-helper"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormHelperText id="email-helper">Edit your email</FormHelperText>
        </FormControl>
        <FormControl className='form-item'>
          <InputLabel htmlFor='password'></InputLabel>
          <Input
            id="password"
            type='password'
            placeholder="Password"
            aria-describedby="password-helper"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormHelperText id="password-helper">Choose a new password</FormHelperText>
        </FormControl>
        <FormControl className='form-item'>
          <InputLabel htmlFor='password'></InputLabel>
          <Input
            id="password"
            type='password'
            placeholder="Confirm password"
            aria-describedby="password-helper"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormHelperText id="password-helper">Confirm your password</FormHelperText>
        </FormControl>
        <Button
          variant='primary'
          type='submit'
          onClick={submitHandler}
        >
          Update
        </Button>
        {alertMessage && <Alert variant='filled' severity="error" sx={{width: '100%', }} >{alertMessage}</Alert>}
      </div>
    </div>
  )
}

export default Profile