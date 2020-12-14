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

const cardSideStyle = {
    borderRadius: '2px',
    position: 'absolute',
    width: '90%',
    height: '90%',
}

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '20rem',
        minWidth: '15rem',
        height: '100%',
        width: '100%',
        display: 'flex',
        position: 'relative',
        background: 'transperant',
        overflow: 'visible',
    },
    innerCard: {
        position: 'relative',
        boxShadow: 'none',
        background: 'transparent',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardMedia: {
        height: 150,
        width: '100%',
        borderRadius: '2px 2px 0 0'
    },
    cardFront: {
        ...cardSideStyle,
        boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
    },
    cardHeader: {
        textShadow: '2px 2px 4px black',
        height: '50%',
        display: 'flex',
        alignItems: 'center'
    },
    cardBack: {
        ...cardSideStyle,
        boxShadow: theme.shadows[3],
        backfaceVisibility: 'hidden',
        transform: 'rotateY(-180deg)',
        backgroundColor: theme.palette.primary.light,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem',
        alignItems: 'flex-end'
    },
    description: {
        maxHeight: '80%',
        fontSize: '1.2em'
    }
}))

const defaultRotateStyle = {
    transition: 'all 0.7s ease-in-out',
    transform: 'rotateY(0)',
    transformStyle: 'preserve-3d',
    perspective: '2500px',
}

const rotateTransitionStyles = {
    entering: { transform: 'rotateY(180deg)' },
    entered: { transform: 'rotateY(0)' },
    exiting: { transform: 'rotateY(0)' },
    exited: { transform: 'rotateY(180deg)' }
}

const ProjectCard = ({ content = { front: '', back: '', image: '' }, onButtonClick = () => console.log('noButtonInput') }) => {
    const classes = useStyles();
    const [isHover, setIsHover] = React.useState(false);
    const { front, back, image } = content;
    return (
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className={classes.root}>
            <CSSTransition in={isHover} timeout={200}>
                {state =>
                    <Card className={classes.innerCard} style={{ ...defaultRotateStyle, ...rotateTransitionStyles[state] }} >

                        <div style={{ ...defaultRotateStyle, ...rotateTransitionStyles[state] }} className={classes.cardFront}>
                            <CardMedia className={classes.cardMedia} image={image} />
                            <CardHeader className={classes.cardHeader} title={front}>
                            </CardHeader>
                        </div>
                        <div style={{ ...defaultRotateStyle, ...rotateTransitionStyles[state] }} className={classes.cardBack}>
                            <CardContent>
                                <Typography className={classes.description} variant='body1'>
                                    {back}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing classes={{ root: classes.cardActions }}>
                                <Button size='small' variant='contained' color='secondary' onClick={onButtonClick}>
                                    Demo
                                </Button>
                            </CardActions>
                        </div>


                    </Card>
                }
            </CSSTransition>
        </div>
    )
}

export default ProjectCard;
