import createTheme from "@mui/material/styles/createTheme"

// TO-DO: upgrade to v5 structure
export default createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#63a4ff",
      dark: "#004ba0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff9800",
      light: "#ffc947",
      dark: "#c66900",
      contrastText: "#ffffff",
    },
    background: { default: "#F8FAFF" },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  props: {
    MuiLink: {
      underline: "none",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: 8,
          height: 8,
          background: "#fff",
        },

        "*::-webkit-scrollbar-track": {
          background: "#6161613d",
        },

        "*::-webkit-scrollbar-thumb": {
          "-webkitBoxShadow": "inset 0 0 6px rgba(0,0,0,0.3)",
          background: "#525252",
        },
      },
    },
  },
})
