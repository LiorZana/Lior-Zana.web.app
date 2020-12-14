import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Waypoint } from 'react-waypoint';
import { CSSTransition } from 'react-transition-group';



const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '5rem',
        minHeight: '100%',
        marginBottom: '10em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& >*': {
            textAlign: 'center',
        },
        ' & div, ul, li': {
            fontSize: '1rem'
        }
    },
    container: {
        width: '80%',
        padding: '1em 1em 1em 1em',
        boxShadow: theme.shadows[3],
        fontSize: '1rem'
    },
    sectionHeader: {
        fontSize: '2rem'
    },
    ulist: {
        listStyle: 'none',
    },
    listHeader: {
        textAlign: 'center',
        fontSize: '1.2rem',
        marginBottom: '0.1rem',
        '&::first-letter': {
            color: theme.palette.secondary.light,
            fontSize: '1.7rem'
        }
    },
    whyLi: {
        paddingBottom: '0.5rem'
    },
    quote: {
        color: theme.palette.secondary.light,
        fontStyle: 'italic',
        fontSize: '1rem'
    }
}))


const defaultPopInStyle = {
    transition: 'all 0.5s ease-in-out',
    opacity: 0
}

const popInTransitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 1 },
    exited: { opacity: 0 }
}

const Home = () => {
    const classes = useStyles();
    const [partsScrolled, setPartsScrolled] = React.useState(false);

    const ChevronIcon = <ChevronRightIcon classes={{ root: classes.chevronIcon }} fontSize='inherit' viewBox={'0 0 20 18'} />
    return (
        <div className={classes.root}>
            <Waypoint bottomOffset={'25%'} onEnter={() => !partsScrolled ? setPartsScrolled(1) : false} onLeave={({ currentPosition }) => partsScrolled && currentPosition === 'below' ? setPartsScrolled(0) : false} />
            <CSSTransition in={partsScrolled > 0} timeout={100}>
                {state =>
                    <Box style={{ ...defaultPopInStyle, ...popInTransitionStyles[state] }} className={classes.container} component='div'>
                        <Typography className={classes.sectionHeader} align='center' component='h1' variant='h1' color='primary'>
                            WHO
                </Typography>
                        <Typography component='div' variant='body1'>
                            My name is <span style={{ fontSize: '1.5rem' }}>Lior Zana</span>, I am <span style={{ fontSize: '1.5rem' }}>26</span> years old and I currently live in <span style={{ fontSize: '1.5rem' }}>Ashkelon, Israel</span>.
            </Typography>
                    </Box>
                }
            </CSSTransition>
            <Waypoint bottomOffset={'30%'} onEnter={() => partsScrolled < 2 ? setPartsScrolled(2) : false} onLeave={({ currentPosition }) => partsScrolled > 1 && currentPosition === 'below' ? setPartsScrolled(1) : false} />
            <CSSTransition in={partsScrolled > 1} timeout={200}>
                {state =>
                    <Box style={{ ...defaultPopInStyle, ...popInTransitionStyles[state] }} className={classes.container} component='div'>
                        <Typography className={classes.sectionHeader} align='center' component='h1' variant='h1' color='primary'>
                            WHAT
                        </Typography>
                        <Typography className={classes.ulist} component='ul' variant='body1'>
                            <Typography>I am a fullstack web developer.</Typography>
                            <Typography>I have a firm knowledge of HTML, CSS, and Javascript, which enables me to engage in each and every aspect of building a web application -</Typography>

                            <Typography component='li'>
                                {ChevronIcon}
                                Developing fast and responsive websites and web apps using ReactJS, Facebook's highly popular library for developing modern day web applications.
                            </Typography>
                            <Typography component='li'>
                                {ChevronIcon}
                                Starting up a complete NodeJs + Express.js server with endpoints and API calls.
                            </Typography>
                            <Typography component='li'>
                                {ChevronIcon}Building and working with two of the most popular databases today - MongoDB(NoSql) and PostgresQL(SQL)
                            </Typography>
                        </Typography>
                    </Box>
                }
            </CSSTransition>

            <Waypoint bottomOffset={'50%'} onEnter={() => partsScrolled < 3 ? setPartsScrolled(3) : false} onLeave={({ currentPosition }) => partsScrolled > 2 && currentPosition === 'below' ? setPartsScrolled(2) : false} />
            <CSSTransition in={partsScrolled > 2} timeout={300}>
                {state =>
                    <Box style={{ ...defaultPopInStyle, ...popInTransitionStyles[state] }} className={classes.container} component='div'>
                        <Typography className={classes.sectionHeader} align='center' component='h1' variant='h1' color='primary'>
                            WHY
                        </Typography>

                        <Typography className={classes.ulist} component='ul' variant='body1'>

                            <Typography component='li' className={classes.whyLi}>
                                <Typography display='inline' variant='h5' component='div'>
                                    <p style={{ display: 'inline-block', margin: 0, padding: 0 }} className={classes.listHeader}>
                                        {'Passionate and'}
                                    </p>
                                    <p style={{ display: 'inline', margin: 0, padding: 0 }}>
                                        {' '}
                                    </p>
                                    <p style={{ display: 'inline-block', margin: 0, padding: 0 }} className={classes.listHeader}>
                                        {'Hardworking:'}
                                    </p><br></br>
                                </Typography>

                                <Typography component='div'>
                                    I've put these two together because I truly believe one cannot go without the other.
                                    I am hardworking because I am so passionate about what I'm doing.
                                    I LOVE writing code, learning new technologies, and becoming a better and more knowledgeable developer than I was the day before.
                                    That is why I'm willing to invest myself in becoming the best at what I do.
                            <Typography className={classes.quote}>"Oh he's doing that 'I solved it' dance again?" ~some coworker of mine</Typography>
                                </Typography>
                            </Typography>

                            <Typography component='li' className={classes.whyLi}>
                                <Typography className={classes.listHeader} variant='h5' component='h5'>
                                    Efficient:
                                </Typography>
                                <Typography component='div'>
                                    I write clean, understandable and efficient code. Coming from a game developement background, React's Component method of work came naturally to me,
                                    and so I make sure to focus on code modularity and reusablity.
                                    <Typography className={classes.quote}>"Who named a function 'getIsOn3'??" ~not a coworker of mine</Typography>
                                </Typography>
                            </Typography>

                            <Typography component='li' className={classes.whyLi}>
                                <Typography className={classes.listHeader} variant='h5' component='h5'>
                                    Adaptable:
                    </Typography>
                                <Typography component='div'>
                                    After finishing the initial course I took in web developement(<a href='https://zerotomastery.io/' target='_blank' rel='noreferrer'>ZTM</a>),
                                    I started learning studying by myself - new libraries, new tools, a new database and mainly becoming more proficient in Javascript and React.
                                    I believe that when you put your mind to it and know the right tools - Stakoverflow, Github, Google, etc.. - you can learn anything by yourself these days.
                                    <Typography className={classes.quote}>"If you don't yet know it, then learn it!" ~me</Typography>
                                </Typography>
                            </Typography>

                            <Typography component='li' className={classes.whyLi}>
                                <Typography className={classes.listHeader} variant='h5' component='h5'>
                                    Team player:
                    </Typography>
                                <Typography component='div'>
                                    I love working with a team. When working with a team I make sure to cooperate and keep in sync with my teammates
                                    so as to not hurt the workflow by avoidable mistakes.
                                    I also think that being able to share your ideas and thoughts with teammates
                                    and recieve critisism is one of the best ways to expand your sight and knowledge, making you a better thinker and problem solver in the process.
                                    <Typography className={classes.quote}>“I don’t like that man. I must get to know him better.” ― Abraham Lincoln, an actual famous person</Typography>
                                </Typography>

                            </Typography>
                        </Typography>
                    </Box>
                }
            </CSSTransition>




        </div>
    )
}

export default Home;