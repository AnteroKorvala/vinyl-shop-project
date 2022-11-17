import { createTheme } from "@mui/material"

const theme = createTheme({
  palette: {
    primary: {
      light: '#E9FFF9',
      main: '#9ED8DB',
      dark: '#467599',
      contrastText: '#D64045'
    },
    secondary: {
      light: '#E9FFF9',
      main: '#D64045',
      dark: '#1D3354',
      contrastText: '#D64045'
    }
  }
})

/*
D64045 Enlish Vermillion
E9FFF9 Light Cyan
9ED8DB Powder Blue
467599 Queen Blue
1D3354 Prussian Blue
*/

export default theme