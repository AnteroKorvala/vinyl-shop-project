import { FormControl, FormHelperText, InputLabel, Input, Button } from '@mui/material'
import React, {useState} from 'react'
import './Profile.css'
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

function Profile() {
  const [username, setUsername] = useState("Haxeli")
  const [email, setEmail] = useState("haxeli@gmail.com")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [image, setImage] = useState()

  function UpdateProfile({username, email, password}) {
    console.log('update')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    UpdateProfile({username, email, password})
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
          <FormHelperText id="username-helper">Don't choose a dumb name</FormHelperText>
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
          <FormHelperText id="email-helper">Did you create that email when you were 12?</FormHelperText>
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
          <FormHelperText id="password-helper">We'll always share your password</FormHelperText>
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
          <FormHelperText id="password-helper">We'll always share your password</FormHelperText>
        </FormControl>
        <Button
          variant='primary'
          type='submit'
          onClick={submitHandler}
        >
          Update
        </Button>
      </div>
    </div>
  )
}

export default Profile