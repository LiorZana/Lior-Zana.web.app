import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import monogramSvg from './monogram.svg';
import monogram from './monogram.png';

const useStyles = makeStyles((theme) => ({
    progressWrapper: {
        zIndex: 5,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(150,150,150,0.2)'
    },
    progressRoot: {
    },
    progressTopCircle: {
        color: '#6196ff',
        transitionDelay: '0.4s'
    },
    progressBottomCircle: {
        color: theme.palette.primary.dark,
    },
    initials: {
        color: 'white'
    }
}))



const ProgressCircle = ({ isIn, value }) => {
    const classes = useStyles();


    const progressWrapperStyle = {
        transitionProperty: 'opacity',
        transitionDuration: '1s',
        transitionDelay: '1s',
        pointerEvents: isIn ? 'all' : 'none',
        opacity: isIn ? 1 : 0
    }
    return (
        <Box className={classes.progressWrapper} style={progressWrapperStyle} position='fixed'>
            <Box className={classes.progressWrapper} position='fixed'>
                <CircularProgress variant='determinate' size={100} value={100} classes={{ root: classes.progressRoot, circle: classes.progressBottomCircle }} />
            </Box>
            <Box className={classes.progressWrapper} position='fixed'>
                <CircularProgress variant='determinate' size={100} value={value} classes={{ root: classes.progressRoot, circle: classes.progressTopCircle }} />
                <Box className={classes.progressWrapper} position='fixed'>
                    <img src={monogramSvg} onError={(e) => e.target.src = monogram} width={69.5} height={65.5} alt='LZ' />
                </Box>
            </Box>
        </Box>
    )
}

export default ProgressCircle
