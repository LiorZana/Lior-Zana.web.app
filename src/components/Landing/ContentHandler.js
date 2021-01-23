import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CSSTransition } from 'react-transition-group';
import { opacityTransition } from '../../utils/transitions';
import { Waypoint } from 'react-waypoint';

const useStyles = makeStyles((theme) => ({
    headerWrapper: {
        pointerEvents: 'none',
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: 2,
    },
    currentHeader: {
        pointerEvents: 'auto',
        userSelect: 'none',
        fontSize: '15vw',
        zIndex: 2,
        textShadow: '-2px -2px 5px black',
        [theme.breakpoints.down('650')]: {
            fontSize: '6.2rem',
        },
        [theme.breakpoints.down('450')]: {
            fontSize: '5rem',
        },
        [theme.breakpoints.down('375')]: {
            fontSize: '4rem',
        },

    },
    paraWrapper: {
        position: 'absolute',
        pointerEvents: 'none',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        bottom: 0,
        textAlign: 'center',
        zIndex: 2
    },
    para: {
        pointerEvents: 'auto',
        position: 'relative',
        fontSize: '5vw',
        textAlign: 'center',
        padding: '0 1em 0 1em',
        color: '#ffffff',
        textShadow: '0.5px 0.5px 1px black',
        [theme.breakpoints.down('900')]: {
            fontSize: '4vw'
        },
        [theme.breakpoints.down('600')]: {
            fontSize: '1.8em'
        }
    },
}))

const currentOpacityTransition = opacityTransition(250);
const defaultOpacityStyle = currentOpacityTransition.defaultStyle;
const opacityTransitionStyles = currentOpacityTransition.transitionStyles;


export const Header = ({ currentContent = 'home', isAfterTop, swappingHeaders }) => {
    const classes = useStyles();
    const [headerState, setHeaderState] = React.useState({ text: '', color: '' })
    const theme = useTheme();
    React.useEffect(() => {
        switch (currentContent) {
            case 'home':
                setHeaderState({ text: 'Welcome.', color: theme.palette.primary.light });
                break;
            case 'skills':
                setHeaderState({ text: 'My skills.', color: theme.palette.secondary.light});
                break;
            case 'works':
                setHeaderState({ text: 'My works.', color: theme.palette.teriary.dark });
                break;
            case 'contact':
                setHeaderState({ text: 'Contact me.', color: theme.palette.quaternary.light });
                break;
            case 'Error':
                setHeaderState({ text: 'Error 404!', color: theme.palette.quaternary.light });
                break;
            default:
                setHeaderState({ text: 'no header set', color: 'black' });
        }
    }, [currentContent])

    return (
        <>
            <CSSTransition in={isAfterTop && !swappingHeaders} appear timeout={{ enter: 800, exit: 100 }}>
                {state =>
                    <div style={{ ...defaultOpacityStyle, ...opacityTransitionStyles[state] }} className={classes.headerWrapper}>
                        <Typography style={{ color: headerState.color }} role='heading' aria-label={headerState.text} className={classes.currentHeader} variant='body1'>
                            {headerState.text}
                        </Typography>
                    </div>
                }
            </CSSTransition>
        </>
    )

}


export const Paragraph = React.forwardRef((props, ref) => {
    const classes = useStyles();
    const { currentContent = 'home' } = props;
    const [paragraphState, setParState] = React.useState('')
    const [isIn, setIsIn] = React.useState(false);
    React.useEffect(() => {
        switch (currentContent) {
            case 'home':
                setParState(["My name is Lior Zana", <br key={'br'}></br>, "and I'm a web developer!"]);
                break;
            case 'skills':
                setParState("These are my skills, plain and simple.");
                break;
            case 'works':
                setParState("Take a look at my works.");
                break;
            case 'contact':
                setParState("Here are all the ways YOU can contact ME.");
                break;
            case 'Error':
                setParState("The page you are looking for isn't here.");
                break;
            default:
                setParState("no paragraph set");
        }
    }, [currentContent])

    return (
        <>
            <CSSTransition in={isIn} timeout={{ enter: 200, exit: 100 }}>
                {state =>
                    <div className={classes.paraWrapper} ref={ref}>
                        <Typography style={{ ...defaultOpacityStyle, ...opacityTransitionStyles[state] }} role='heading' aria-label={paragraphState} aria-level={4} className={classes.para} variant='body1'>
                            {paragraphState}
                        </Typography>
                        <Waypoint style={{ position: 'absolute', bottom: 0 }} bottomOffset={'10%'} onEnter={() => setIsIn(true)} onLeave={({ currentPosition }) => currentPosition === 'below' ? setIsIn(false) : false}>
                        </Waypoint>
                    </div>}
            </CSSTransition>
        </>

    )

})

