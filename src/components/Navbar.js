import React, {useEffect, useState} from "react"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import AlbumIcon from "@mui/icons-material/Album"
import ListAltIcon from "@mui/icons-material/ListAlt"
import SearchIcon from '@mui/icons-material/Search'
import { ThemeProvider } from '@mui/system'
import theme from './Theme'
import { Link, Navigate } from "react-router-dom"
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Typography,
  TextField,
  InputAdornment
} from "@mui/material"
import Axios from 'axios'
import Constants from './Constants.json'

function Navbar(props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [resultShow, setResultShow] = useState()
  const isUserLoggedIn = props.isUserLoggedIn

  useEffect(() => {
    console.log(searchTerm)
    console.log(resultShow)
  })
  
  useEffect(() => {
    Axios.get(Constants.API_ADDRESS + '/').then(
      (response) => {
        console.log('ihere')
        const vinylArray = response.data
        const resultArray = vinylArray.map((item) => ({
          vinylID: item._id,
          artist: item.artist,
          name: item.name,
          genre: item.genre
        }))
        setResultShow(resultArray)
      }
    )
  }, [])

  return (
    <div className="navbar-container">
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="sticky" color="primary">
            <Container maxWidth="x1">
              <Toolbar disableGutters>
                <IconButton
                  size="large"
                  href="/"
                  color="inherit"
                  edge="start"
                  sx={{
                    display: { xs: "none", md: "flex" },
                    ml: 10,
                  }}
                >
                  <AlbumIcon sx={{fontSize: '55px'}} />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    fontSize: "30px",
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  AUDIOPIUM
                </Typography>
                <Box sx={{mr: 10}}>
                  <div className="searchfield">
                    <TextField
                      id="search-input"
                      label="Search..."
                      type="text"
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        )
                      }}
                    >
                    </TextField>
                    <div className="search-results">
                      {searchTerm && 
                        resultShow.filter((item) => {
                          if(searchTerm === "") return item
                          else if(
                            (item.name)
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          ) return item
                          else if(
                            (item.artist)
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          ) return item
                        }).map((item, vinylID) => {
                          return (
                            <div
                              className="result-vinyl"
                              key={vinylID}
                              
                            >
                              <div>{item.name}</div>
                              <div>{item.artist}</div>
                              <div>{item.genre}</div>
                              <button onClick={() => {
                                  Navigate(`/oneVinyl/${item.vinylID}`)
                                }}>
                              </button>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </Box>
                <Box sx={{mr: 10}}>
                  {isUserLoggedIn === true && <IconButton
                    sx={{mr: 1}}
                    onClick={console.log('implement wishlist action')}
                    color="inherit"
                    href="/wishlist"
                  >
                    <ListAltIcon sx={{ fontSize: "40px" }} />
                  </IconButton>}
                  <IconButton
                    sx={{mr: 0}}
                    color="inherit"
                    href={isUserLoggedIn ? "/profile" : "/login"}
                  >
                    <AccountCircleIcon sx={{ fontSize: "40px" }} />
                  </IconButton>
                  {props.isUserLoggedIn ? (
                    <>
                      <Link to="/"  onClick={props.logout}> Log Out </Link>
                    </>
                    )
                    :
                    (
                    null
                    )
                  }
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default Navbar
