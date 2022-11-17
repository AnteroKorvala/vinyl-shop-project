import React from "react"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import AlbumIcon from "@mui/icons-material/Album"
import ListAltIcon from "@mui/icons-material/ListAlt"
import SearchIcon from '@mui/icons-material/Search'
import { ThemeProvider } from '@mui/system'
import theme from './Theme'
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

function Navbar() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary" maxWidth="100vw">
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
                <TextField
                  id="search-input"
                  label="Search..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                >
                  IMPLEMENT ME!!!!!!!!!!!!!!!!
                </TextField>
              </Box>
              <Box sx={{mr: 10}}>
                <IconButton
                  sx={{mr: 1}}
                  onClick={console.log('implement wishlist action')}
                  color="inherit"
                  href="/wishlist"
                >
                  <ListAltIcon sx={{ fontSize: "40px" }} />
                </IconButton>
                <IconButton
                  sx={{mr: 0}}
                  onClick={console.log('implement profile action')}
                  color="inherit"
                  href="/profile"
                >
                  <AccountCircleIcon sx={{ fontSize: "40px" }} />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </ThemeProvider>
  )
}

export default Navbar
