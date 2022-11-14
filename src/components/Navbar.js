import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlbumIcon from "@mui/icons-material/Album";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";

function Navbar() {
  return (
    <Box>
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
                mr: 1,
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
                mr: 10,
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
            <IconButton
              onClick={console.log('implement wishlist action')}
              color="inherit"
              href="/wishlist"
            >
              <ListAltIcon sx={{ fontSize: "40px" }} />
            </IconButton>
            <IconButton
              onClick={console.log('implement profile action')}
              color="inherit"
              href="/profile"
            >
              <AccountCircleIcon sx={{ fontSize: "40px" }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Navbar;
