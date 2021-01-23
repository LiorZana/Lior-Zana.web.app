import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CSSTransition } from 'react-transition-group';
import cover0 from '../../backgrounds/cover0.svg';
import cover1 from '../../backgrounds/cover1.svg';
import cover2 from '../../backgrounds/cover2.svg';
import cover3 from '../../backgrounds/cover3.svg';
//import cover4 from '../backgrounds/cover4.svg';
//backgrounds('coverX.svg') are by the great website at https://www.svgbackgrounds.com/ 

const coverClass = {
    backgroundImage: `url(${cover0})`,
    backgroundSize: 'cover',
    overflow: 'hidden',
    width: 'inherit',
    minWidth: '100vw',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
    },
    bgWrapper: {
        height: '100%',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
    },
    cover0: coverClass,
    cover1: { ...coverClass, backgroundImage: `url(${cover1})` },
    cover2: { ...coverClass, backgroundImage: `url(${cover2})` },
    cover3: { ...coverClass, backgroundImage: `url(${cover3})` },
}))




const Background = ({ currentRoute, setSwappingHeaders, handleBGtransitionEnd }) => {
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
            case 'Error':
                setCurrentBackground(0);
                break;
            default:
                throw new Error();
        }
    }, [currentRoute])

    const coverClassesArr = [classes.cover0, classes.cover1, classes.cover2, classes.cover3]


    const defaultBackgroundStyle = (i) => {
        return {
            position: 'absolute',
            right: i === currentBackground ? 0 : (i > currentBackground ? '-100%' : '100%'),
            minWidth: '100%',
            transform: 'translate(0, 0)',
            transition: 'all 1s ease-out',
            transitionDelay: '500ms'
        }
    }



    return (
        <div className={classes.root}>

            {coverClassesArr.map((coverClass, i) => {
                const isCurrentBackground = currentBackground === i;
                return (
                    <CSSTransition key={i} in={isCurrentBackground} appear onEntered={() => setSwappingHeaders(false)} onExit={() => setSwappingHeaders(true)} onExited={() => handleBGtransitionEnd()} timeout={{ enter: 300, exit: 400 }}>
                        <div className={classes.bgWrapper} style={{ ...defaultBackgroundStyle(i) }}>
                            <div
                                onMouseEnter={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}
                                className={coverClass}>
                            </div>
                        </div>
                    </CSSTransition>
                )
            })}


        </div>

    )
}

export default Background
