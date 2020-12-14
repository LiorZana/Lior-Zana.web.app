import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { stackIcons, techIcons } from './iconImports.js';
import { CSSTransition } from 'react-transition-group';
import { Waypoint } from 'react-waypoint';

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: theme.typography.body1.fontFamily,
        padding: '5rem 0 10rem 0'
    },
    card: {
        height: '100%',
        minwidth: '20em',
        padding: '0 2em 0 2em',
        '& .MuiCardContent-root:last-child': {
            padding: 0
        }
    },
    media: {
        height: 75,
        margin: '2em 0 1em 0',
        width: '100%',
        backgroundSize: 'contain',
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        marginBottom: '1.5em'
    },
    header: {
        fontSize: '20px',
        fontWeight: 'bold',
        margin: 0,
        padding: 0,
        paddingBottom: '0.5em'
    },
    skills: {
        height: '100%',
        fontSize: '18px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& p': {
            margin: '0.2em 0 0.2em 0',
            padding: 0
        }
    },
    line: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconsCredit: {
        position: 'absolute',
        width: '100%',
        margin: '1rem 0',
        bottom: 0,
        textAlign: 'center'

    }

}))

const defaultPopInStyle = {
    transition: 'all 1s ease-in-out',
    transform: 'translate(-3000px, 0)'
}

const popInTransitionStyles = {
    entering: { transform: 'translate(-3000px, 0)' },
    entered: { transform: 'translate(0, 0)' },
    exiting: { transform: 'translate(0, 0)' },
    exited: { transform: 'translate(-3000px, 0)' }
}

const SkillCard = ({ lines = [], header = 'none', image, i = 0, style }) => {
    const classes = useStyles();

    return (
        <Grid style={style} item xs={10} sm={5} md={3} lg={2}>
            <Card
                classes={{ root: classes.card }}
                raised
            >
                <CardMedia
                    className={classes.media}
                    title='stackIcon'
                    image={image}>
                </CardMedia>
                <CardContent className={classes.text} component='div'>
                    <CardContent className={classes.header} component='p'>
                        {header}
                    </CardContent>

                    <CardContent classes={{ root: classes.skills }} component='div'>
                        {lines.map(line => {
                            return (
                                <span className={classes.line} key={line.text}>
                                    <img alt={line.text} style={{ width: '20%', margin: '0.5em 1em 0.5em 1em' }} src={line.image}></img>
                                    <p>{line.text}</p>
                                </span>
                            );
                        })}
                    </CardContent>

                </CardContent>

            </Card>
        </Grid>
    )
}


const skillsCards = [
    {
        header: 'FRONT END',
        lines: [
            { text: 'HTML', image: techIcons.html },
            { text: 'CSS', image: techIcons.css },
            { text: 'Javascript', image: techIcons.javascript },
            { text: 'React', image: techIcons.react },
            { text: 'Redux', image: techIcons.redux },
            { text: 'Material-UI', image: techIcons.materialUI },
        ],
        image: stackIcons.frontend
    },
    {
        header: 'SERVER',
        lines: [
            { text: 'NodeJs', image: techIcons.nodejs },
            { text: 'Express', image: techIcons.express },
            { text: 'Heroku', image: techIcons.heroku }
        ],
        image: stackIcons.server
    },
    {
        header: 'DATABASE',
        lines: [
            { text: 'MongoDB', image: techIcons.mongodb },
            { text: 'Mongoose', image: techIcons.mongoose },
            { text: 'PostgresQL', image: techIcons.postgres }
        ],
        image: stackIcons.database
    }
]

const Skills = () => {
    const classes = useStyles();
    const [isIn, setIsIn] = React.useState(false);

    return <div className={classes.root}>
        <Waypoint bottomOffset={'60%'} onEnter={() => setIsIn(true)} onLeave={({ currentPosition }) => currentPosition === 'below' ? setIsIn(false) : false}>
            <Grid justify='center' alignContent='center' container spacing={2}>
                {skillsCards.map(({ header, lines, image }, i) => {
                    return <CSSTransition key={i} in={isIn} timeout={100 * (i*5)}>
                        {state =>
                                <SkillCard header={header} lines={lines} style={{ ...defaultPopInStyle, ...popInTransitionStyles[state] }} image={image}></SkillCard>

                        }
                    </CSSTransition>
                })
                }


            </Grid>
        </Waypoint>

        <div className={classes.iconsCredit}>The 'Front end', 'Server' and 'Database' icons were made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

    </div>
}

export default Skills;