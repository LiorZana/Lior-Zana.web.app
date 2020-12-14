import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CSSTransition } from 'react-transition-group';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    links: {
        pointerEvents: 'auto',
        '& a': {
            fontSize: '2rem',
            [theme.breakpoints.down('590')]: {
                fontSize: '1.5rem',
            },
            [theme.breakpoints.down('380')]: {
                fontSize: '1rem',
            },
        }
    },
    linksWrapper: {
        pointerEvents: 'none',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
        top: 0,
        paddingTop: '1em',
        '& a': {
            margin: '1em',
            pointerEvents: 'auto'
        }
    },
}))

const Links = ({ routesArray, isInTop, handleNavClick, currentRoute }) => {
    const classes = useStyles();

    const defaultPopInStyle = {
        transition: 'all 1s ease-in-out',
        transform: 'translate(0, -50vh)'
    }

    const popInTransitionStyles = {
        entering: { transform: 'translate(0, -50vh)' },
        entered: { transform: 'translate(0, 0)' },
        exiting: { transform: 'translate(0, 0)' },
        exited: { transform: 'translate(0, -50vh)' },
    }

    const getLinkUnderline = (linkRoute) => {
        return linkRoute === currentRoute ?
            'always' :
            'hover';
    }

    return (
        <div className={classes.linksWrapper}>
            {routesArray.map((routeName, i) => {
                return (
                    <CSSTransition in={isInTop} key={routeName} timeout={200 * (i + 1)}>
                        { state =>
                            <div style={{ ...defaultPopInStyle, ...popInTransitionStyles[state]}}>
                                <Typography display='inline' className={classes.links} variant='body1'>
                                    <Link style={{ color: 'grey' }} underline={getLinkUnderline(routeName)} href='#' onClick={() => handleNavClick(routeName)}>{routeName.charAt(0).toUpperCase() + routeName.slice(1)}</Link>
                                </Typography>
                            </div>
                        }
                    </CSSTransition>
                )
            })}
        </div>
    )
}

export default Links
