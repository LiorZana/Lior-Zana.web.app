import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { CSSTransition } from 'react-transition-group';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { opacityTransition } from '../../utils/transitions';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        overflow: 'visible',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
        userSelect: 'none'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: '0.1rem 1rem 1.2rem 1rem',
        boxShadow: theme.shadows[3],
        margin: 0,
    },
    header: {
        fontSize: '2rem',
        padding: '0.7rem 0',
        color: theme.palette.primary.light,
        textShadow: '-1px 2px 2px grey',
        [theme.breakpoints.down('450')]: {
            fontSize: '1.7rem'
        },
    },
    textBox: {
        fontSize: '1.2rem',
        padding: '0 2rem',
        [theme.breakpoints.down('500')]: {
            fontSize: '1.1rem'
        },
        [theme.breakpoints.down('450')]: {
            fontSize: '1rem'
        },
        [theme.breakpoints.down('420')]: {
            fontSize: '0.9rem'
        },
        [theme.breakpoints.down('370')]: {
            fontSize: '0.8rem'
        },
    },
    ulist: {
        listStyle: 'none',
        padding: '1rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    liWrapper: {
        position: 'relative',
        lineHeight: '1.1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    li: {
        fontSize: '1.25rem',
        backgroundColor: 'rgb(240, 245, 245)',
        borderRadius: '5px',
        padding: '0 1rem',
        width: '100%',
        [theme.breakpoints.down('850')]: {
            fontSize: '1rem'
        },
        [theme.breakpoints.down('500')]: {
            fontSize: '0.9rem'
        },
        [theme.breakpoints.down('420')]: {
            fontSize: '0.8rem'
        },
        [theme.breakpoints.down('370')]: {
            fontSize: '0.7rem'
        }
    },
    objectLi: {
        display: 'flex',
        flexDirection: 'column',
    },
    listHeader: {
        textAlign: 'center',
        fontSize: '1.2rem',
        marginBottom: '0.5rem',
        '&::first-letter': {
            color: theme.palette.primary.main,
            fontSize: 'larger'
        },
        [theme.breakpoints.down('400')]: {
            fontSize: '0.9rem',

        },
    },
    quote: {
        color: theme.palette.secondary.light,
        fontStyle: 'italic',
        fontSize: '0.9rem',
        [theme.breakpoints.down('400')]: {
            fontSize: '0.7rem'
        },
    },
    chevronIcon: {
        color: theme.palette.primary.dark,
        position: 'relative',
        marginRight: '0.1rem'
    }
}))

const currentOpacityTransition = opacityTransition(500);
const defaultOpacityStyle = currentOpacityTransition.defaultStyle;
const opacityTransitionStyles = currentOpacityTransition.transitionStyles;

const ItemList = ({ listItems }) => {
    const classes = useStyles();
    const ChevronIcon = <ChevronRightIcon classes={{ root: classes.chevronIcon }} fontSize='inherit' viewBox={'0 0 20 18'} />

    return (
        <Typography key={classes.ulist} component='ul' role='main' variant='body1' className={classes.ulist}>
            {listItems.map((li, i) => {
                return (
                    <Typography key={i} variant='body1' role='landmark' component='li'>
                        <div className={classes.liWrapper}>
                            {typeof li === 'string' ?
                                <Typography key={i} variant='body1' component='p' className={classes.li}>
                                    {ChevronIcon}{li}
                                </Typography>
                                :
                                <div key={i} className={classes.objectLi}>

                                    {li?.header ?
                                        <Typography variant='h4' component='h4' role='heading' className={classes.listHeader}>
                                            {li.header}
                                        </Typography>
                                        :
                                        false}

                                    {li?.text ?
                                        <Typography variant='body1' component='p' role='article' className={classes.li}>
                                            {li.text}
                                        </Typography>
                                        :
                                        false}
                                    {li?.quote ?
                                        <Typography variant='body1' component='span' className={classes.quote}>
                                            {li?.quote}

                                            <Divider variant='middle' />
                                        </Typography>
                                        :
                                        false}
                                </div>
                            }
                            {/* 
                            <Divider orientation="vertical" flexItem /> */}
                        </div>

                    </Typography>
                )
            })}
        </Typography>
    )
}



const IntroCard = ({ header = 'noHeader', textBoxes = [], listItems = [], customProps = {} }) => {
    const classes = useStyles();
    const mainDivProps = { ...customProps, className: `${classes.root}${customProps?.className ? ` ${customProps.className}` : ''}` }
    return (
        <div {...mainDivProps}>
            <CSSTransition in={true} timeout={200}>
                {state =>
                    <Box style={{ ...defaultOpacityStyle, ...opacityTransitionStyles[state] }} classes={{ root: classes.container }} component='div'>
                        <Typography component='h1' variant='h1' role='heading' aria-label={`${header} header`} className={classes.header}>
                            {header}
                        </Typography>
                        <Typography component='div' role='group'>
                            {textBoxes.map((text, i) => {
                                return (
                                    <Typography key={i} variant='body1' component='p' className={classes.textBox}>
                                        {text}
                                    </Typography>
                                )
                            })}
                        </Typography>


                        <ItemList listItems={listItems} />

                    </Box>
                }
            </CSSTransition>
        </div>

    )
}

export default IntroCard
