import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import { stackIcons, techIcons } from '../../utils/iconImports.js';
import { CSSTransition } from 'react-transition-group';
import { Waypoint } from 'react-waypoint';
import { popInTransition } from '../../utils/transitions';

const background = 'linear-gradient(16deg, rgba(116, 116, 116,0.02) 0%, rgba(116, 116, 116,0.02) 25%,transparent 25%, transparent 96%,rgba(177, 177, 177,0.02) 96%, rgba(177, 177, 177,0.02) 100%),linear-gradient(236deg, rgba(148, 148, 148,0.02) 0%, rgba(148, 148, 148,0.02) 53%,transparent 53%, transparent 59%,rgba(56, 56, 56,0.02) 59%, rgba(56, 56, 56,0.02) 100%),linear-gradient(284deg, rgba(16, 16, 16,0.02) 0%, rgba(16, 16, 16,0.02) 46%,transparent 46%, transparent 71%,rgba(181, 181, 181,0.02) 71%, rgba(181, 181, 181,0.02) 100%),linear-gradient(316deg, rgba(197, 197, 197,0.02) 0%, rgba(197, 197, 197,0.02) 26%,transparent 26%, transparent 49%,rgba(58, 58, 58,0.02) 49%, rgba(58, 58, 58,0.02) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))';

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: theme.typography.body1.fontFamily,
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        minHeight: '100vh',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
    },
    gridRoot: {
        height: '100%',
        padding: '5rem 0',
        overflow: 'visible'
    },
    card: {
        padding: '0.9rem 0',
        position: 'relative',
        overflow: 'visible',
        height: '100%',
        minwidth: '20em',
        '& .MuiCardContent-root:last-child': {
            padding: 0
        }
    },
    stackIcon: {
        height: 75,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        margin: '1.5em 0 1.5em 0',
        width: '100%',
        backgroundSize: 'contain',
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        marginBottom: '1.5em'
    },
    header: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: 0,
        padding: 0,
        position: 'absolute',
        bottom: '-1.7rem',
    },
    skills: {
        margin: '2.5rem 0 1rem 0',
        fontSize: '1.2rem',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& p': {
            margin: '0.2em 0 0.2em 0',
            padding: 0
        }
    },
    line: {
        display: 'flex',
        width: '100%',
        height: 'fit-content',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0.2rem 0'
    },
    iconsCredit: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        textAlign: 'center'

    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundImage: background,
        backgroundSize: 'cover',
        zIndex: 0,
    }

}))

const currentPopInTransition = popInTransition(1000, '-3000px, 0')
const defaultPopInStyle = currentPopInTransition.defaultStyle;
const popInTransitionStyles = currentPopInTransition.transitionStyles;

const SkillCard = ({ lines = [], header = 'none', image, i = 0, style }) => {
    const classes = useStyles();

    return (
        <Grid style={style} item xs={10} sm={5} md={3} lg={3}>
            <Card
                classes={{ root: classes.card }}
                raised
            >
                <CardMedia
                    className={classes.stackIcon}
                    title={header.toLowerCase()}
                    role='img'
                    aria-label={'icon and header'}
                    image={image}>
                    <CardContent className={classes.header} role='heading' aria-label={header} component='p'>
                        {header}
                    </CardContent>
                </CardMedia>
                <CardContent classes={{ root: classes.skills }} component='div'>
                    {lines.map(line => {
                        return (
                            <span className={classes.line} key={line.text}>
                                <span style={{ width: '30%', height: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img alt={`${line.text} icon`} style={{ width: '3rem' }} src={line.image}></img>
                                </span>
                                <p style={{ width: '30%', display: 'flex', justifyContent: 'center' }}>{line.text}</p>
                            </span>
                        );
                    })}
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
        <div className={classes.background} />
        <Waypoint bottomOffset={'40%'} onEnter={() => setIsIn(true)} onLeave={({ currentPosition }) => currentPosition === 'below' ? setIsIn(false) : false}>
            <span style={{ position: 'absolute', top: 0 }} />
        </Waypoint>
        <Grid classes={{ root: classes.gridRoot }} justify='center' alignContent='center' container spacing={2}>
            {skillsCards.map(({ header, lines, image }, i) => {
                return <CSSTransition key={i} in={isIn} timeout={300 * i}>
                    {state =>
                        <SkillCard header={header} lines={lines} style={{ ...defaultPopInStyle, ...popInTransitionStyles[state] }} image={image}></SkillCard>

                    }
                </CSSTransition>
            })
            }


        </Grid>
        <div style={{ marginBottom: '1rem' }} className={classes.iconsCredit}>
            The 'Front end', 'Server' and 'Database' icons were made by{' '}
            <Link href="https://www.flaticon.com/authors/freepik" title="Freepik" target='blank'>
                Freepik
            </Link>
            {' '}from{' '}
            <Link href="https://www.flaticon.com/" title="Flaticon" target='blank'>
                www.flaticon.com
            </Link>
        </div>
    </div>
}

export default Skills;