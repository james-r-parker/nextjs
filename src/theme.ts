import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette : {
    background : {
      default : "#F5F5F5"
    }
  },
  typography: {
    allVariants: {
      color: "#15537D"
    },
    h1: {
      fontSize: "4.4rem",
      fontWeight: 600
    },
    subtitle1: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight : "2.5rem"
    },
    fontFamily: [
      'Plus Jakarta Sans',
      'sans-serif'
    ].join(','),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "white",
          boxShadow: "none",
          borderBottom: "solid 1px #EBEBEB",
          marginBottom : 40
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textDecoration: "none",
          fontSize: "0.9em"
        }
      }
    }
  }
});

export default theme;