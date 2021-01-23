import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CSSTransition } from 'react-transition-group';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { opacityTransition } from '../../utils/transitions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        pointerEvents: 'none',
        overflow: 'visible',
        display: 'flex',
        justifyContent: 'center',
        minWidth: '100vw',
        maxWidth: '100%',
        '& .MuiButton-root': {
            width: '5%',
            minWidth: '1.3rem'
        }
    },
    child: {
        position: 'absolute',
        paddingBottom: '5rem',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
        paddingTop: '3rem',
        top: 0,
        transition: 'all 1s ease-out',
        display: 'flex',
        justifyContent: 'center',
        perspective: '3000px',
        pointerEvents: 'none',
        transformOrigin: 'top'
    },
    container: {
        position: 'relative',
        minHeight: '20vh',
        maxWidth: '85vw',
    },
    button: {
        color: 'white',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.2)',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.4)'
        },
        top: 0,
        pointerEvents: 'auto',
        height: '100%',
        padding: 0,
        '& span': {
            margin: 0
        },
    },
    buttonLabel: {
    }
}))

const currentOpacityTransition = opacityTransition(1000);
const defaultOpacityStyle = currentOpacityTransition.defaultStyle;
const opacityTransitionStyles = currentOpacityTransition.transitionStyles;


const CardWheel = ({ children, isIn = true, childProps = {} }) => {
    const classes = useStyles();
    const [selected, setSelected] = React.useState(0);
    const [isHoveringButton, setHoveringButton] = React.useState(false);
    const [childHeight, setChildHeight] = React.useState(0);
    const childRef = React.useRef(null);

    React.useEffect(() => {
        const height = childRef.current.clientHeight;
        setChildHeight(height);
        return () => {

        }
    }, [selected, childRef.current])


    const former = selected === 0 ? children.length - 1 : selected - 1;
    const next = selected === children.length - 1 ? 0 : selected + 1;


    const childTransitionStyles = (i) => ({
        entering: { transform: `translate3d(${i === former ? 30 : i === next ? -30 : 0}vw, 5vh, ${(i !== selected) ? 0 : 1000}px) scale(0.3, 0.3)`, zIndex: 0, filter: 'blur(3px)', pointerEvents: 'none' },
        entered: { transform: 'translate3d(0, 0, 0) scale(1, 1)', zIndex: 1, filter: 'blur(0)', pointerEvents: 'auto' },
        exiting: { transform: 'translate3d(0, 0, 0) scale(1, 1)', zIndex: 1, filter: 'blur(0)', pointerEvents: 'auto' },
        exited: { transform: `translate3d(${i === former ? -30 : i === next ? 30 : 0}vw, 5vh, ${(i !== selected) ? 0 : 1000}px) scale(0.3, 0.3)`, zIndex: 0, filter: 'blur(3px)', pointerEvents: 'none' }
    })

    const getTimeout = (i, initialValue) => {
        return i === former ? initialValue
            : i === next ? initialValue * 6
                : i === selected ? initialValue * 10 : initialValue * 12;
    }

    const getCurrentRef = (ref, i) => {
        return i === selected ? childRef.current = ref : false;
    }


    return (
        <div className={classes.root} style={{ minHeight: '100vh', height: `${childHeight}px` }}>

            {children.map((Child, i) => {
                return <CSSTransition in={i === selected} key={i} timeout={100}>
                    {state =>
                        <div className={classes.child} ref={(ref) => getCurrentRef(ref, i)} style={{ ...childTransitionStyles(i)[state] }}>
                            <CSSTransition in={isIn} timeout={getTimeout(i, 100)}>
                                {state =>
                                    <div className={classes.container} role='list' style={{ ...defaultOpacityStyle, ...opacityTransitionStyles[state] }}>
                                        <CSSTransition in={i === selected} timeout={100}>
                                            {state =>
                                                <>
                                                    <Button
                                                        aria-label='Left'
                                                        role='button'
                                                        variant='text'
                                                        onMouseEnter={() => setHoveringButton(true)}
                                                        onMouseLeave={() => setHoveringButton(false)}
                                                        startIcon={<ArrowLeftIcon className={isHoveringButton ? 'scale-up-down' : ''} />}
                                                        classes={{ root: classes.button, label: classes.buttonLabel }}
                                                        onClick={() => setSelected(former)}
                                                        style={{ right: '100%', borderRadius: '3px 0 0 3px', ...defaultOpacityStyle, ...opacityTransitionStyles[state] }}>
                                                    </Button>
                                                    <Button
                                                        variant='text'
                                                        aria-label='Right'
                                                        role='button'
                                                        onMouseEnter={() => setHoveringButton(true)}
                                                        onMouseLeave={() => setHoveringButton(false)}
                                                        startIcon={<ArrowRightIcon className={isHoveringButton ? 'scale-up-down' : ''} />}
                                                        classes={{ root: classes.button, label: classes.buttonLabel }}
                                                        onClick={() => setSelected(next)}
                                                        style={{ left: '100%', borderRadius: '0 3px 3px 0', ...defaultOpacityStyle, ...opacityTransitionStyles[state] }}>
                                                    </Button>
                                                </>
                                            }
                                        </CSSTransition>
                                        {React.cloneElement(Child, { customProps: { ...childProps, role: 'listitem' } })}
                                    </div>
                                }
                            </CSSTransition>
                        </div>
                    }
                </CSSTransition >
            })}
            {/* <CSSTransition in={true} timeout={100}>
                {state =>
                    <div style={{ ...defaultChildStyle, ...childTransitionStyles[state] }}>
                        {children[selected]}
                    </div>
                }
            </CSSTransition>
            <CSSTransition in={false} timeout={100}>
                {state =>
                    <div style={{ ...defaultChildStyle, ...childTransitionStyles[state] }}>
                        {children[next]}
                    </div>
                }
            </CSSTransition> */}
        </div >
    )
}

export default CardWheel
