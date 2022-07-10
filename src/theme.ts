import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: "#F5F5F5"
    },
    primary: {
      main: "#005CB9"
    },
    secondary: {
      main: "#027800"
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
    h2: {
      fontSize: "2.8rem",
      fontWeight: 600
    },
    subtitle1: {
      fontSize: "1.8rem",
      fontWeight: 600,
      lineHeight: "2.5rem"
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
          marginBottom: 40,
          borderLeft: "none",
          borderRight: "none",
          borderTop: "none",
          borderRadius: 0
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textDecoration: "none",
          fontSize: "0.9em",
          color: "#15537D"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          height: "54px",
          textTransform: "none",
          fontSize: "1.2rem"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        elevation: {
          borderRadius: "20px",
          border: "solid 1px #CBD9E0",
          boxShadow: "none"
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
          },
          "& .MuiInputLabel-shrink" : {
            color : "#005CB9"
          }
        }
      }
    }
  }
});

export default theme;