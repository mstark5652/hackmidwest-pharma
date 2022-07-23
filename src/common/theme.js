import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
})

const customTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#ff0000' },
    secondary: { main: '#ffffff' }
  },
  typography: {
    fontFamily: [
      'Helvetica',
      'Arial',
      'sans-serif'
    ].join(','),
    fontStyle: 'normal'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius:'50px', 
          width:'250px', 
          height:'100px'
        }
      }
    }
  }
})

export default responsiveFontSizes(customTheme)
