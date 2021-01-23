import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { CSSTransition } from 'react-transition-group';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Links from './Links.js';
import Background from './Background.js';
import { Header, Paragraph } from './ContentHandler.js';
import { opacityTransition } from '../../utils/transitions';
import HeaderBG from './HeaderBG.js';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '200vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1
    },
    bottomButtonRoot: {
        position: 'fixed',
        zIndex: 3,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '10%',
        minHeight: '3.5rem',
        backgroundColor: 'rgba(75,75,75,0.1)',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.3)'
        }
    },

}))



const currentOpacityTransition = opacityTransition(500);
const defaultOpacityStyle = currentOpacityTransition.defaultStyle;
const opacityTransitionStyles = currentOpacityTransition.transitionStyles;


const Landing = ({ currentRoute, isInTop, isAfterTop, routesArr, componentsLoaded }) => {
    const classes = useStyles();
    const [swappingHeaders, setSwappingHeaders] = React.useState(false);
    const [currentContent, setCurrentContent] = React.useState('home');
    const paragraphRef = React.useRef(null);


    useEffect(() => {
        currentRoute === 'Error' ? setCurrentContent('Error') : false;
        return () => {
        }
    }, [currentRoute])

    const handleBGtransitionEnd = () => {
        setCurrentContent(currentRoute)
    }

    // window.onresize = () => {
    //     if(!isInTop){
    //         rootRef.current.scrollIntoView({ inline: 'start' })
    //     }
    // }


    let showHeader = isAfterTop && componentsLoaded > 0;
    let showHeaderBG = isAfterTop && !swappingHeaders && componentsLoaded > 1;
    let showLinks = isInTop && componentsLoaded > 2;
    const showButtonDown = isAfterTop && !swappingHeaders && componentsLoaded > 3;

    return (
        <div className={classes.root}>
            <HeaderBG isAfterTop={showHeaderBG} swappingHeaders={swappingHeaders} />

            <Links routesArr={routesArr} isInTop={showLinks} currentRoute={currentRoute} />
            <Header currentContent={currentContent} isAfterTop={showHeader} swappingHeaders={swappingHeaders} />
            <Paragraph currentContent={currentContent} ref={paragraphRef} />




            <CSSTransition key={'down-button'} in={showButtonDown} timeout={100}>
                {state =>
                    <Button
                        aria-label='Go to paragraph'
                        classes={{ root: classes.bottomButtonRoot }}
                        style={{ ...defaultOpacityStyle, ...opacityTransitionStyles[state] }}
                        onClick={() => paragraphRef.current.scrollIntoView({ behaviour: 'smooth', block: 'end' })}
                        variant='text'
                        startIcon={<KeyboardArrowDownIcon className={'scale-up-down'} />}
                    >

                    </Button>}
            </CSSTransition>

            <Background currentRoute={currentRoute} handleBGtransitionEnd={handleBGtransitionEnd} setSwappingHeaders={setSwappingHeaders} isInTop={isInTop} />




        </div>
    )
}

export default Landing;