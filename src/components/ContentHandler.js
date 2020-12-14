import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CSSTransition } from 'react-transition-group';
import { Waypoint } from 'react-waypoint';

const useStyles = makeStyles((theme) => ({
    para: {
        pointerEvents: 'none',
        position: 'relative',
        fontSize: '5vw',
        textAlign: 'center',
        padding: '0 1em 0 1em',
        color: '#40224a',
        [theme.breakpoints.down('900')]: {
            fontSize: '4vw'
        },
        [theme.breakpoints.down('600')]: {
            fontSize: '1.8em'
        }
    },
    headerWrapper: {
        pointerEvents: 'none',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
    currentHeader: {
        pointerEvents: 'none',
        fontSize: '15vw',
    },
    paraWrapper: {
        position: 'relative',
        zIndex: 2
    }
}))

const defaultOpacityStyle = {
    transition: 'all 250ms ease-in',
    opacity: 0,
}
const opacityTransitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 1 },
    exited: { opacity: 0 },
}


export const Header = ({ currentContent = 'home', isInTop, swappingHeaders }) => {
    const classes = useStyles();
    const [headerState, setHeaderState] = React.useState('')
    React.useEffect(() => {
        switch (currentContent) {
            case 'home':
                setHeaderState('Welcome.')
                break;
            case 'skills':
                setHeaderState('My skills.')
                break;
            case 'works':
                setHeaderState('My works.');
                break;
            case 'contact':
                setHeaderState('Contact me.')
                break;
            default:
                setHeaderState('no header set');
        }
    }, [currentContent])

    return <CSSTransition in={isInTop && !swappingHeaders} appear timeout={{ enter: 500, exit: 100 }}>
        {state =>
            <div style={{ ...defaultOpacityStyle, ...opacityTransitionStyles[state] }} className={classes.headerWrapper}>
                <Typography className={classes.currentHeader} variant='body1' color='primary'>
                    {headerState}
                </Typography>
            </div>
        }
    </CSSTransition>


}


export const Paragraph = ({ currentContent = 'home' }) => {
    const classes = useStyles();
    const [paragraphState, setParState] = React.useState('')
    const [isIn, setIsIn] = React.useState(false);
    React.useEffect(() => {
        switch (currentContent) {
            case 'home':
                setParState("My name is Lior Zana and I'm a web developer!")
                break;
            case 'skills':
                setParState("These are my skills, plain and simple")
                break;
            case 'works':
                setParState("Take a look at my works");
                break;
            case 'contact':
                setParState("Here are all the ways YOU can contact ME")
                break;
            default:
                setParState("no paragraph set");
        }
    }, [currentContent])

    return (
        <div>
            <CSSTransition in={isIn} timeout={{ enter: 200, exit: 100 }}>
                {state =>
                    <div className={classes.paraWrapper}>
                        <Typography style={{ ...defaultOpacityStyle, ...opacityTransitionStyles[state] }} className={classes.para} variant='body1'>
                            {paragraphState}
                        </Typography>
                        <Waypoint style={{ position: 'absolute', bottom: 0}} bottomOffset={'30%'} onEnter={() => setIsIn(true)} onLeave={({ currentPosition }) => currentPosition === 'below' ? setIsIn(false) : false}>
                        </Waypoint>
                    </div>}
            </CSSTransition>

        </div>

    )

}

