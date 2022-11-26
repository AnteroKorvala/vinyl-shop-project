import { FormControl, FormHelperText, InputLabel, Input } from '@mui/material'
import React from 'react'
import './Profile.css'
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

function Profile() {
  return (
    <div className='profile-container'>
      <div className='form-profile'>
        <div className='form-profile-icon'>
          <AccountCircleIcon sx={{fontSize: "5em"}} />
        </div>
        <FormControl className='form-item'>
          <InputLabel htmlFor='username'>Username</InputLabel>
          <Input id="username" aria-describedby="username-helper" />
          <FormHelperText id="username-helper">Don't choose a dumb name</FormHelperText>
        </FormControl>
        <FormControl className='form-item'>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <Input id="password" aria-describedby="password-helper" />
          <FormHelperText id="password-helper">We'll always share your password</FormHelperText>
        </FormControl>
      </div>
    </div>
  )
}

export default Profile