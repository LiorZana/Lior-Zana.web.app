import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { CSSTransition } from 'react-transition-group';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        flexWrap: 'wrap',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: '2px',
        [theme.breakpoints.down('1400')]: {
            textAlign: 'center',
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            overflow: 'scroll',
            '& >*': {
                alignItems: 'center',
            }
        }
    },
    title: {
        color: theme.palette.primary.dark,
        fontSize: '2rem'
    },
    gif: {
        height: '30rem',
        width: '50rem',
        margin: '0.5em',
        boxShadow: theme.shadows[10],
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        [theme.breakpoints.down('850')]: {
            height: '20rem',
            width: '30rem',
        },
        [theme.breakpoints.down('500')]: {
            height: '15rem',
            width: '25rem',
        }
    },
    techsTitle: {
    },
    projectInfo: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    buttonRoot: {
        marginTop: '1em',
        padding: '1em',
        borderRadius: '20px 20px 0 0 ',
        boxShadow: 'none',
        transition: 'opacity 1s',
        opacity: 0.5,
        '&:hover': {
            opacity: 1,
            boxShadow: 'none'
        }
    },
    techList: {
        display: 'flex',
        maxHeight: '40vh',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'space-around',
        listStyle: 'none',
        flexWrap: 'wrap',
        paddingBottom: '1em',
        marginTop: 0,
        paddingTop: 0,
        [theme.breakpoints.down('800')]: {
            alignContent: 'flex-start',
        },
        '& >*': {
            marginTop: '1em',
            [theme.breakpoints.down('1050')]: {
                fontSize: '0.7rem'
            },
            [theme.breakpoints.down('800')]: {
                fontSize: '0.5rem'
            }
        }
    },
    techIcon: {
        width: '2em',
        height: '2em',
        marginRight: '1em',
        verticalAlign: 'bottom',
    },
    backButtonRoot: {
        position: 'absolute',
        borderRadius: 0,
        top: 0,
        left: 0
    }
}))

const ProjectPopup = ({ currentProject, setIsHoveringContent, handleClosePopup }) => {
    const classes = useStyles();
    return (
        <Card onMouseEnter={() => setIsHoveringContent(true)} onMouseLeave={() => setIsHoveringContent(false)} className={classes.root} >
            <Button onClick={handleClosePopup} startIcon={<CloseIcon />} variant='text' color='secondary' classes={{ root: classes.backButtonRoot }}></Button>
            <CardContent className={classes.projectInfo}>
                <CardHeader component='h3' title={currentProject?.name} titleTypographyProps={{ className: classes.title }} subheader={currentProject?.description} />

                <CardContent className={classes.techsTitle}>
                    <Typography component='h6' variant='h6'>
                        Technologies used:
                </Typography>
                </CardContent>

                <CardContent component='ul' className={classes.techList}>

                    {currentProject?.techs.map(tech =>
                        <CardMedia className={classes.techIcon} image={tech.icon} key={tech.name}>
                            <Typography style={{ marginLeft: '2em' }} component='li' display='inline' variant='body1'>
                                {tech.name}
                            </Typography>
                        </CardMedia>
                        // <Typography component='li' variant='body1'>
                        //     <img className={classes.techIcon} src={tech.icon} alt={tech.name}></img>{tech.name}
                        // </Typography>
                    )}
                </CardContent>

            </CardContent>
            <CardMedia className={classes.gif} image={currentProject?.images?.gif}>
                <Button classes={{ root: classes.buttonRoot }} variant='contained' color='primary' href={currentProject?.link} target='_blank' rel='noreferrer'>Visit the website</Button>
            </CardMedia>
        </Card>
    )
}

export default ProjectPopup
