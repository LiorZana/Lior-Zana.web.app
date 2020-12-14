import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CSSTransition } from 'react-transition-group';
import cover0 from '../backgrounds/cover0.svg';
import cover1 from '../backgrounds/cover1.svg';
import cover2 from '../backgrounds/cover2.svg';
import cover3 from '../backgrounds/cover3.svg';
//import cover4 from '../backgrounds/cover4.svg';
//backgrounds('coverX.svg') are by the great website at https://www.svgbackgrounds.com/ 

const coverClass = {
    backgroundImage: `url(${cover0})`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: 'inherit',
    minWidth: '100vw',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    '& >*': {
        marginBottom: '20em'
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    bgWrapper: {
        height: '100%',
        width: '100%'
    },
    cover0: coverClass,
    cover1: { ...coverClass, backgroundImage: `url(${cover1})` },
    cover2: { ...coverClass, backgroundImage: `url(${cover2})` },
    cover3: { ...coverClass, backgroundImage: `url(${cover3})` },
}))


const Background = ({ currentRoute, setSwappingHeaders, isInTop, children }) => {
    const classes = useStyles();
    const [isHover, setIsHover] = React.useState(true);
    const [currentBackground, setCurrentBackground] = React.useState(0);

    React.useEffect(() => {
        switch (currentRoute) {
            case 'home':
                setCurrentBackground(0);
                break;
            case 'skills':
                setCurrentBackground(1);
                break;
            case 'works':
                setCurrentBackground(2);
                break;
            case 'contact':
                setCurrentBackground(3);
                break;
            default:
                throw new Error();
        }
    }, [currentRoute])

    const coverClassesArr = [classes.cover0, classes.cover1, classes.cover2, classes.cover3]

    const defaultScaleStyle = {
        transition: 'all 2s ease-in-out',
        transformOrigin: 'top',
        transform: 'scale(1, 1)',
    }
    const scaleTransitionStyles = {
        entering: { transform: 'scale(1, 1)', },
        entered: { transform: 'scale(1, 1.08)', },
        exiting: { transform: 'scale(1, 1.08)', },
        exited: { transform: 'scale(1, 1)', },
    }

    const defaultBackgroundStyle = (i) => {
        return {
            transition: 'all 1s ease-in-out',
            transitionDelay: '1.5s',
            position: 'absolute',
            left: i === currentBackground ? 0 : (i > currentBackground ? '-100%' : '100%'),
            transform: `translate(0, 0)`,
            minWidth: '100%',
        }
    }



    return (
        <div className={classes.root}>
            {coverClassesArr.map((coverClass, i) => {
                return (
                    <CSSTransition key={i} in={currentBackground === i} onEntered={() => setSwappingHeaders(false)} onExit={() => setSwappingHeaders(true)} timeout={{ enter: 2500, exit: 100 }}>
                        <div className={classes.bgWrapper} style={{ ...defaultBackgroundStyle(i) }}>
                            <CSSTransition in={isHover && isInTop} timeout={10} appear={false} classNames='coverimage'>
                                {state => (
                                    <div
                                        onMouseEnter={() => setIsHover(true)}
                                        onMouseLeave={() => setIsHover(false)}
                                        style={{ ...defaultScaleStyle, ...scaleTransitionStyles[state] }}
                                        className={coverClass}>
                                        {currentBackground === i ? children : false}
                                    </div>)}
                            </CSSTransition>
                        </div>
                    </CSSTransition>
                )
            })}


        </div>

    )
}

export default Background
