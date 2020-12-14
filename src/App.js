import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Landing from './components/Landing.js';
import Home from './components/Home.js';
import Skills from './components/Skills.js';
import Works from './components/Works.js';
import Contact from './components/Contact.js';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    overflow: 'hidden',
    color: 'black',
    minWidth: '100vw',
    minHeight: '100%',
    zIndex: 0,
  },
}))

function App() {
  const classes = useStyles();
  const [currentRoute, setCurrentRoute] = React.useState('home');

  const handleNavClick = (route) => {
    setCurrentRoute(route);
  }

  const renderSwitch = () => {
    switch(currentRoute) {
      case 'home': 
        return <Home/>;
      case 'skills':
        return <Skills/>;
      case 'works':
        return <Works/>;
      case 'contact':
        return <Contact/>;
      default:
        return false;
    }
  }

  return (
    <Grid container alignContent='flex-start' justify='center' classes={{ root: classes.root }}>
      <Grid item xs={12} lg={12}>
        <Landing handleNavClick={handleNavClick} currentRoute={currentRoute} />
      </Grid>
      <Grid item xs={12} lg={12}>
        {renderSwitch()}
      </Grid>


    </Grid>
  );
}

export default App;
