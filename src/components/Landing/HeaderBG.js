import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CSSTransition } from 'react-transition-group';
import ShiftBG from '../ShiftBackground/ShiftBG.js';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        backgroundColor: 'rgba(0,0,0,0.2)',
        filter: 'blur(1px)',
    },
}))

const defaultOpacityStyle = {
    transition: 'all 250ms ease-in',
    perspective: '0',
    opacity: 0,
}
const opacityTransitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 1 },
    exited: { opacity: 0 },
}

const HeaderBG = ({ isAfterTop }) => {
    const classes = useStyles();
    return (
        <CSSTransition in={isAfterTop} timeout={{ enter: 700, exit: 100 }} >
            {state =>
                <div className={classes.root} style={{ ...defaultOpacityStyle, ...opacityTransitionStyles[state] }}>
                    <ShiftBG className={classes.shift}/>
                </div>
            }
        </CSSTransition>
    )
}

export default HeaderBG
