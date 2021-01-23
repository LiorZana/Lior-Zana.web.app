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
import { rotateTransition } from '../../utils/transitions';

const cardSideStyle = {
    borderRadius: '2px',
    position: 'absolute',
    width: '90%',
    height: '90%',
    borderRadius: '25px',
}

const useStyles = makeStyles((theme) => ({
    root: {
        userSelect: 'none',
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
        borderRadius: '25px 25px 0 0',
        backfaceVisibility: 'none'
    },
    cardFront: {
        ...cardSideStyle,
        boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.secondary.main,
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
        backgroundColor: theme.palette.secondary.light,
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
        color: 'white',
        maxHeight: '80%',
        fontSize: '1.5em',
        [theme.breakpoints.down('1300')]: {
            fontSize: '1.3em'
        },
        [theme.breakpoints.down('1000')]: {
            fontSize: '1.1em'
        },
    },
    buttonRoot: {
        backgroundColor: `${theme.palette.teriary.light}33`,
        '&:hover': {
            backgroundColor: `${theme.palette.secondary.main}aa`,
        },
        border: '1px solid white'
    },
    buttonLabel: {
        color: 'white'
    }
}))

const currentRotateTransition = rotateTransition(700, 180, '2500px', true);
const defaultRotateStyle = currentRotateTransition.defaultStyle;
const rotateTransitionStyles = currentRotateTransition.transitionStyles;

const ProjectCard = ({ content = { front: '', back: '', image: '' }, onButtonClick = () => {}, style={} }) => {
    const classes = useStyles();
    const [isHover, setIsHover] = React.useState(false);
    const { front, back, image } = content;
    return (
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} onTouchStart={() => setIsHover(true)} onMouseOver={() => setIsHover(true)} style={style} className={classes.root}>
            <CSSTransition in={isHover} timeout={200}>
                {state =>
                    <Card className={classes.innerCard} style={{ ...defaultRotateStyle, ...rotateTransitionStyles[state] }} >

                        <div style={{ ...defaultRotateStyle, ...rotateTransitionStyles[state] }} className={classes.cardFront}>
                            <CardMedia className={classes.cardMedia} component='img' role='screenshot' alt={front} image={image} />
                            <CardHeader role='heading' className={classes.cardHeader} title={front}>
                            </CardHeader>
                        </div>
                        <div style={{ ...defaultRotateStyle, ...rotateTransitionStyles[state] }} className={classes.cardBack}>
                            <CardContent>
                                <Typography className={classes.description} variant='body1'>
                                    {back}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing classes={{ root: classes.cardActions }}>
                                <Button role='button' aria-label='Demo' size='large' variant='outlined' classes={{ root: classes.buttonRoot, label: classes.buttonLabel }} onClick={onButtonClick}>
                                    Watch demo
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
