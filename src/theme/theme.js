import { createMuiTheme } from "@material-ui/core/styles";
import fontArray from '../font/font.js'
import './theme.css';


const Theme = createMuiTheme({
    palette: {
        primary: {
            main: '#45A9BF'
        },
        secondary: {
            main: '#542B72'
        },
        teriary: {
            main: '#8eedcb',
            light: '#c1fffe',
            dark: '#5cba9a',
            contrastText: '#000000'
        },
        quaternary: {
            main: '#F2DB94',
            light: '#ff9285',
            dark: '#bc2c2e',
            contrastText: '#000000'
        }

    },
    typography: {
        fontFamily: 'Pier-Sans, David',
        body1: {
            fontFamily: 'Pier-Sans, David',
            fontSize: 20,
            fontWeight: 10
        },
        button: {
            fontFamily: 'Helvetica'
        }

    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [...fontArray],
                'body': {
                    lineHeight: 'normal',
                }
            },
        }
    },
});
export default Theme;
