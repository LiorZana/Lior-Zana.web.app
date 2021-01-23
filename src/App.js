import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Waypoint } from 'react-waypoint';
import { CSSTransition } from 'react-transition-group';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Landing from './components/Landing/Landing.js';
import Home from './components/Home/Home.js';
import Skills from './components/Skills/Skills.js';
import Works from './components/Works/Works.js';
import Contact from './components/Contact/Contact.js';
import Footer from './components/Footer/Footer.js';
import ProgressCircle from './components/Loading/ProgressCircle.js';
import Box from '@material-ui/core/Box';
import { Route, Switch, useLocation } from 'react-router-dom';
import { opacityTransition } from './utils/transitions';
import { disableScroll, enableScroll } from './utils/preventScroll.js';
import { getRandomInRange } from './utils/functions';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    position: 'relative',
    overflow: 'visible',
    color: 'black',
    minWidth: '100vw',
    maxWidth: '100vw',
    minHeight: '100%',
    zIndex: 0,
  },
  topButtonRoot: {
    position: 'fixed',
    zIndex: 2,
    right: 0,
    top: 0,
    width: '8%',
    height: '20%',
    color: 'rgba(0,0,0,0.5)',
    '&:hover': {
      color: 'rgba(0,0,0,1)'
    }
  }
}))


const routesArr = [
  { name: 'home', route: '/', Component: Home },
  { name: 'skills', route: '/skills', Component: Skills },
  { name: 'works', route: '/works', Component: Works },
  { name: 'contact', route: '/contact', Component: Contact }
]


const initialComponentsLoadedState = { loaded: 0 };
const componentsLoadedReducer = (state, action) => {
  switch (action.type) {
    case 'IncrementLoaded':
      return { loaded: state.loaded + 1 };
    case 'DecrementLoaded':
      return { loaded: state.loaded - 1 };
  }
}

const currentOpacityTransition = opacityTransition(250);
const defaultOpacityStyle = currentOpacityTransition.defaultStyle;
const opacityTransitionStyles = currentOpacityTransition.transitionStyles;

function App() {
  const classes = useStyles();
  const [currentRoute, setCurrentRoute] = React.useState('home');
  const [isInTop, setIsInTop] = React.useState(false);
  const [isAfterTop, setAfterTop] = React.useState(false);
  const [isHoveringTopButton, setHoveringTopButton] = React.useState(false);
  const [componentsLoaded, dispatchComponentsLoaded] = React.useReducer(componentsLoadedReducer, initialComponentsLoadedState);
  const [progressBarValue, setProgressBarValue] = React.useState(0);
  const [isProgressMounted, setProgressMounted] = React.useState(true);
  const { pathname } = useLocation();
  const topRef = React.useRef(null);


  useEffect(() => {
    const routeNames = routesArr.map(route => route.route);
    const knownRoute = routeNames.filter(path => path === pathname).length;
    const newRoute = !knownRoute ? 'Error' : pathname === '/' ? 'home' : pathname.slice(1);
    setCurrentRoute(newRoute);
    return () => {
    }
  }, [pathname])


  useEffect(() => {
    handleScrollToTop();
    disableScroll();

    const incrementState = (timeout) => {
      dispatchComponentsLoaded({ type: 'IncrementLoaded' });
      clearTimeout(timeout);
    }

    const firstTimeout = setTimeout(() => incrementState(firstTimeout), 1000);
    const secondTimeout = setTimeout(() => incrementState(secondTimeout), 2000);
    const thirdTimeout = setTimeout(() => incrementState(thirdTimeout), 3000);
    const fourthTimeout = setTimeout(() => incrementState(fourthTimeout), 3500)
  }, [])

  
  useEffect(() => {
    switch (componentsLoaded.loaded) {
      case 0:
        setProgressBarValue(0);
        break;
      case 1:
        setProgressBarValue(getRandomInRange(15, 35));
        break;
      case 2:
        setProgressBarValue(50);
        break;
      case 3:
        setProgressBarValue(getRandomInRange(65, 85));
        break;
      case 4:
        setProgressBarValue(100);
        const scrollTimeout = setTimeout(
          () => {
            enableScroll();
            clearTimeout(scrollTimeout);
          }
          , 1000);
        const progressTimeout = setTimeout(
          () => {
            setProgressMounted(false);
            clearTimeout(progressTimeout);
          }
          , 2000);
        break;
      default:
        break;
    }
  }, [componentsLoaded.loaded])


  const handleScrollToTop = () => {
    topRef.current.scrollIntoView({ behaviour: 'smooth', inline: 'start', block: 'start' })
  }



  return (
    <Box component='div' classes={{ root: classes.root }}>
      <span ref={topRef} style={{ position: 'absolute', top: 0, left: '50%' }} />
      <Waypoint onEnter={() => setIsInTop(true)} onLeave={() => setIsInTop(false)} />
      <Waypoint topOffset={'-30%'} onEnter={() => setAfterTop(true)} onLeave={() => setAfterTop(false)} />
      <Grid container alignContent='flex-start' justify='center'>
        <Grid item xs={12} lg={12}>
          <Landing componentsLoaded={componentsLoaded.loaded} isInTop={isInTop} isAfterTop={isAfterTop} currentRoute={currentRoute} routesArr={routesArr} />
        </Grid>
        <Switch>
          {routesArr.map(({ name, route, Component }) => {
            return (
              <Route key={name} exact path={route}>
                <Grid item xs={12} lg={12}>
                  <Component />
                </Grid>
              </Route>
            )
          })}
        </Switch>
      </Grid>

      <Footer />

      {isProgressMounted ?
        <ProgressCircle value={progressBarValue} isIn={componentsLoaded.loaded < 4} />
        :
        false
      }



      <CSSTransition key={'up-button'} in={!isInTop} timeout={100}>
        {state =>
          <Button
            aria-label='Go to top'
            classes={{ root: classes.topButtonRoot }}
            onMouseEnter={() => setHoveringTopButton(true)}
            onMouseLeave={() => setHoveringTopButton(false)}
            style={{ ...defaultOpacityStyle, ...opacityTransitionStyles[state] }}
            onClick={handleScrollToTop}
            variant='text'
            startIcon={<ArrowUpwardIcon className={isHoveringTopButton ? ' scale-up-down' : ''} />}
          />}
      </CSSTransition>

    </Box>

  );
}

export default App;
