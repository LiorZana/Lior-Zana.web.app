import { createMuiTheme } from "@material-ui/core/styles";
import fontArray from '../font/font.js'
import './theme.css';


const Theme = createMuiTheme({
    palette: {
        primary: {
            main: '#45A9BF'
        },
        secondary: {
            main: '#F6334A'
        },
        teriary: {
            main: '#F2DB94',
            light: '#ffffc5',
            dark: '#beaa65',
            contrastText: '#000000'
        },
        quaternary: {
            main: '#F25252',
            light: '#ff857e',
            dark: '#b91529',
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
