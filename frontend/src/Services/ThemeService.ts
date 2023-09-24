import { ThemeProvider, createTheme } from '@mui/material/styles';


export const getTheme = (theme: any) => {

    const darkTheme = createTheme({
        palette: {
            mode: theme,
            primary: {
                main: "rgba(9,9,121,0.9)",
                contrastText: "#fff" //button text white instead of black to support dark theme
            }
        },
        components: {
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderColor: 'black',
                        "&:hover": {
                            boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)" // Add shadow on hover
                        },
                    },
                },
            },
            MuiModal: {
                styleOverrides: {
                    root: {
                    },
                },
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        autoComplete: 'off',
                        fontSize: '14px', // Set the desired font size,
                        marginTop: '0',
                        marginBottom: '0',
                        '&:hover': {
                            border: 'none',
                        },
                        '&:focused': {
                            border: 'none',
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                },

            },
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true, // No more ripple, on the whole application 💣!
                },
            },

            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        padding: '10px 16px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.1s ease', // Adjust transition speed
                        '&:hover': {
                        },
                    },
                    contained: {
                        '&:hover': {
                            color: 'white',
                        },
                    },
                },
            },
        }
    })
    return darkTheme;
}
