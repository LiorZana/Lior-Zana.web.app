import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        userSelect: 'none',
        zIndex: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: '2px',
        pointerEvents: 'auto',
        [theme.breakpoints.down('1400')]: {
            justifyContent: 'flex-start',
            textAlign: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            paddingBottom: '4rem',
            overflowY: 'scroll',
            flexDirection: 'column',
        }
    },
    title: {
        color: theme.palette.primary.dark,
        fontSize: '2rem',
        [theme.breakpoints.down('650')]: {
            fontSize: '1.8rem'
        }
    },
    subHeader: {
        fontSize: '1.3rem',
        [theme.breakpoints.down('650')]: {
            fontSize: '1rem'
        }

    },
    techsTitle: {
        textAlign: 'center'
    },
    projectInfo: {
        maxWidth: '55%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        [theme.breakpoints.down('1400')]: {
            maxWidth: '100%'
        }
    },
    techList: {
        display: 'flex',
        width: '100%',
        minHeight: '3rem',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        listStyle: 'none',
        flexWrap: 'wrap',
        marginBottom: '1.5rem',
        overflowY: 'auto',
        overFlowX: 'hidden',
        marginTop: 0,
        paddingTop: 0,
    },
    tech: {
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        '& >*': {
            padding: '0 0.5rem'
        }
    },
    techIcon: {
        minWidth: '2em',
        minHeight: '2em',
        backgroundSize: 'contain',
        margin: 0,
        verticalAlign: 'bottom',
    },
    vidWrapper: {
        position: 'relative',
        justifySelf: 'flex-end',
        maxWidth: '45rem',
        padding: 0,
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&.MuiCardContent-root:last-child': {
            padding: 0
        },
    },
    vid: {
        boxShadow: theme.shadows[10],
        borderRadius: '5px',
        width: '100%',
        position: 'relative',
        overflow: 'visible',
        backgroundColor: 'transparent',
    },
    buttonRoot: {
        position: 'absolute',
        padding: '0.5rem 1rem',
        bottom: 0,
        borderRadius: '2px',
        boxShadow: 'none',
        transition: 'opacity 1s',
        opacity: 0.5,
        pointerEvents: 'auto',
        '&:hover': {
            opacity: 1,
            boxShadow: 'none'
        }
    },
    backButtonRoot: {
        position: 'absolute',
        color: 'red',
        pointerEvents: 'auto',
        minWidth: '5rem',
        minHeight: '2rem',
        borderRadius: 0,
        top: 0,
        left: 0,
    },
    vidProgress: {
        position: 'absolute',
        margin: 'auto',
        zIndex: 3
    }
}))

const ProjectPopup = ({ currentProject, setIsHoveringContent, handleClosePopup }) => {
    const classes = useStyles();
    const [videoLoaded, setVideoLoaded] = React.useState(false);

    return (
        <Card onMouseEnter={() => setIsHoveringContent(true)} onMouseLeave={() => setIsHoveringContent(false)} className={classes.root} >
            <Button aria-label='Close' onClick={handleClosePopup} startIcon={<CloseIcon />} variant='text' classes={{ root: classes.backButtonRoot }}></Button>
            <CardContent className={classes.projectInfo}>
                <CardHeader component='h3' title={currentProject?.name} titleTypographyProps={{ className: classes.title }} subheader={currentProject?.description} subheaderTypographyProps={{ className: classes.subHeader }} />

                <CardContent className={classes.techsTitle}>
                    <Typography component='h6' variant='h6'>
                        Technologies used:
                </Typography>
                </CardContent>

                <CardContent component='ul' className={classes.techList}>

                    {currentProject?.techs.map(tech =>
                        <CardContent key={tech.name} classes={{ root: classes.tech }}>
                            <CardMedia className={classes.techIcon} image={tech.icon} key={tech.name}>
                            </CardMedia>
                            <Typography component='li' display='inline' variant='body1'>
                                {tech.name}
                            </Typography>
                        </CardContent>
                    )}
                </CardContent>

            </CardContent>
            <CardContent component='div' classes={{ root: classes.vidWrapper }}>
                {!videoLoaded ?
                    <CircularProgress aria-label='Loading' size={80} classes={{ root: classes.vidProgress }} variant='indeterminate' color='primary' />
                    :
                    false
                }
                <CardMedia aria-label='Demo video' onLoadedData={() => setVideoLoaded(true)} className={classes.vid} loop autoPlay muted playsInline component='video'>
                    <source src={currentProject?.images?.webm} type='video/webm' />
                    <source src={currentProject?.images?.mp4} type='video/mp4' />
                </CardMedia>
                <Button aria-label='Go to website' classes={{ root: classes.buttonRoot }} variant='contained' color='primary' href={currentProject?.link} target='_blank' rel='noreferrer'>Visit the website</Button>
            </CardContent>

        </Card>
    )
}

export default ProjectPopup
