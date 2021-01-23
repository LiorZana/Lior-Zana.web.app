import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CSSTransition } from 'react-transition-group';
import Typography from '@material-ui/core/Typography';
import { popInTransition } from '../../utils/transitions';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    links: {
        pointerEvents: 'auto',
        userSelect: 'none',
        position: 'relative',
        zIndex: 3,
        '& a': {

        }
    },
    linksWrapper: {
        pointerEvents: 'none',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: 'fit-content',
        zIndex: 3,
        top: 0,
        left: 0,
        paddingTop: '1rem',
    },
    link: {
        color: 'white',
        display: 'inline-block',
        textShadow: '1px 1px 3px black',
        transitionProperty: 'transform, text-shadow',
        textUnderlineOffset: '3px',
        transitionDuration: '0.5s',
        transformOrigin: 'top',
        pointerEvents: 'auto',
        fontSize: '2rem',
        margin: '0 1em',
        [theme.breakpoints.down('650')]: {
            fontSize: '1.8rem',
            margin: '0 0.8em',

        },
        [theme.breakpoints.down('500')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.down('400')]: {
            fontSize: '1.2rem',
            margin: '0 0.6em'
        },
        '&:hover': {
            transform: 'scale(1.2,1.2)',
        }
    }
}))

const currentPopInTransition = popInTransition(1000, '0, -50vh');
const defaultPopInStyle = currentPopInTransition.defaultStyle;
const popInTransitionStyles = currentPopInTransition.transitionStyles;

const Links = ({ routesArr, isInTop, currentRoute }) => {
    const classes = useStyles();


    const getLinkUnderline = (linkRoute) => {
        return linkRoute === currentRoute ?
            'underline' :
            'none';
    }

    return (
        <div className={classes.linksWrapper}>
            {routesArr.map(({ name, route }, i) => {
                return (
                    <CSSTransition in={isInTop} key={name} timeout={150 * (i + 1)}>
                        { state =>
                            <nav style={{ ...defaultPopInStyle, ...popInTransitionStyles[state] }}>
                                <Typography display='inline' className={classes.links} variant='body1'>
                                    <Link aria-label={name} role='link' className={classes.link} style={{ textDecoration: getLinkUnderline(name) }} to={route}>{name.charAt(0).toUpperCase() + name.slice(1)}</Link>
                                </Typography>
                            </nav>
                        }
                    </CSSTransition>
                )
            })}
        </div>
    )
}

export default Links
