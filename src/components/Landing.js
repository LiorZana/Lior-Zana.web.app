import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { CSSTransition } from 'react-transition-group';
import { Waypoint } from 'react-waypoint';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Links from './Links.js';
import Background from './Background.js';
import { Header, Paragraph } from './ContentHandler.js';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '150em',
        width: '101%',
        minWidth: '100%',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 0
    },
}))

const routesArray = ['home', 'skills', 'works', 'contact']



const Landing = ({ handleNavClick, currentRoute }) => {
    const classes = useStyles();
    const [isInTop, setIsInTop] = React.useState(false);
    const [swappingHeaders, setSwappingHeaders] = React.useState(false);
    const [currentContent, setCurrentContent] = React.useState('home');
    const rootRef = React.useRef(null);


    React.useEffect(() => {
        setTimeout(() => {
            setCurrentContent(currentRoute)
        }, 1000);

    }, [currentRoute])


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





    return <div ref={rootRef} className={classes.root}>
        <Waypoint onEnter={() => setIsInTop(true)} onLeave={() => setIsInTop(false)} />
        <Background currentRoute={currentRoute} setSwappingHeaders={setSwappingHeaders} isInTop={isInTop}>
                <Paragraph currentContent={currentContent} />
        </Background>

        <CSSTransition in={!isInTop} timeout={100}>
            {state =>
                <Button
                    style={{ ...{ position: 'fixed', right: 0, top: 0, width: '8%', height: '20%' }, ...defaultOpacityStyle, ...opacityTransitionStyles[state] }}
                    onClick={() => rootRef.current.scrollIntoView({ behaviour: 'smooth', inline: 'start' })}
                    variant='text'
                    startIcon={<ArrowUpwardIcon />}
                >

                </Button>}
        </CSSTransition>


            <Links routesArray={routesArray} isInTop={isInTop} handleNavClick={handleNavClick} currentRoute={currentRoute} />


        <Header currentContent={currentContent} isInTop={isInTop} swappingHeaders={swappingHeaders} />





        <div style={{ position: 'absolute', bottom: 0 }}>
        </div>

    </div>
}

export default Landing;