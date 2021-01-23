import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Waypoint } from 'react-waypoint';
import IntroCard from './IntroCard.js';
import CardWheel from './CardWheel.js';

const background = 'linear-gradient(74deg, rgba(236, 236, 236,0.02) 0%, rgba(236, 236, 236,0.02) 13%,transparent 13%, transparent 64%,rgba(55, 55, 55,0.02) 64%, rgba(55, 55, 55,0.02) 71%,rgba(239, 239, 239,0.02) 71%, rgba(239, 239, 239,0.02) 100%),linear-gradient(170deg, rgba(8, 8, 8,0.02) 0%, rgba(8, 8, 8,0.02) 1%,transparent 1%, transparent 60%,rgba(9, 9, 9,0.02) 60%, rgba(9, 9, 9,0.02) 80%,rgba(198, 198, 198,0.02) 80%, rgba(198, 198, 198,0.02) 100%),linear-gradient(118deg, rgba(134, 134, 134,0.02) 0%, rgba(134, 134, 134,0.02) 30%,transparent 30%, transparent 43%,rgba(85, 85, 85,0.02) 43%, rgba(85, 85, 85,0.02) 47%,rgba(103, 103, 103,0.02) 47%, rgba(103, 103, 103,0.02) 100%),linear-gradient(249deg, rgba(178, 178, 178,0.02) 0%, rgba(178, 178, 178,0.02) 8%,transparent 8%, transparent 47%,rgba(161, 161, 161,0.02) 47%, rgba(161, 161, 161,0.02) 61%,rgba(19, 19, 19,0.02) 61%, rgba(19, 19, 19,0.02) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255));'


const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        position: 'relative',
        overflow: 'visible',
        minWidth: '100vw',
        maxWidth: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        '& .MuiTypography-colorTextPrimary': {
            color: theme.palette.primary.dark
        }
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
    },
    introCard: {
        backgroundColor: 'rgb(230,230,230)'
    }
}))

const largeFontStyle = { fontSize: 'larger' }

const whoCard = {
    header: 'WHO',
    textBoxes: [
        <>
            My name is <span style={largeFontStyle}>Lior Zana</span>, I am <span style={largeFontStyle}>26</span> years old and I currently live in <span style={largeFontStyle}>Ashkelon, Israel</span>
        </>
    ],
    listItems: []
};

const whatCard = {
    header: 'WHAT',
    textBoxes:
        [
            'I am a fullstack web developer.',
            'I have a firm knowledge of HTML, CSS, and Javascript, which enables me to engage in each and every aspect of building a web application:',
        ],
    listItems: [
        `Developing fast and responsive websites and web apps using ReactJS, Facebook's highly popular library for developing modern day web applications.`,
        'Starting up a complete NodeJs + Express.js server with endpoints and API calls',
        'Building and working with two of the most popular databases today - MongoDB (NoSql) and PostgresQL (SQL)'
    ]
};

const whyCard = {
    header: 'WHY',
    textBoxes: [],
    listItems:
        [
            {
                header: 'Passionate and Hardworking',
                text: `I've put these two together because I truly believe one cannot go without the other.
                                    I am hardworking because I am so passionate about what I'm doing.
                                    I LOVE writing code, learning new technologies, and becoming a better and more knowledgeable developer than I was the day before.
                                    That is why I'm willing to invest myself in becoming the best at what I do.`,
                quote: `"Oh he's doing that 'I solved it' dance again?" ~some coworker of mine`
            },
            {
                header: 'Efficient',
                text: `I write clean, understandable and efficient code. Coming from a game developement background, React's Component method of work came naturally to me,
                                    and so I make sure to focus on code modularity and reusablity.`,
                quote: `"Who named a function 'getIsOn3'??" ~not a coworker of mine`
            },
            {
                header: 'Adaptable',
                text: [`After finishing the initial course I took in web developement (`, <Link color='textPrimary' key={'ZTM-link'} href='https://zerotomastery.io/' target='blank' rel='noreferrer'>ZTM</Link>, `),
                            I started learning by myself - new libraries, new tools, a new database and mainly becoming more proficient in Javascript and React.
                            I believe that when you put your mind to it and get know the right tools - Stackoverflow, Github, Google, etc.. - you can learn anything by yourself these days.`],
                quote: `"If you don't yet know it, then learn it!" ~me`
            },
            {
                header: 'Team player',
                text: `I love working with a team. When working with a team I make sure to cooperate and keep in sync with my teammates
                            so as to not hurt the workflow by avoidable mistakes.
                            I also think that being able to share your ideas and thoughts with teammates
                            and recieve criticism is one of the best ways to expand your sight and knowledge, making you a better thinker and problem solver in the process.`,
                quote: `“I don’t like that man. I must get to know him better.” ~Abraham Lincoln, an actual famous person`
            },
        ]
}




const Home = () => {
    const classes = useStyles();
    const [isIn, setIsIn] = React.useState(false);


    return (
        <div className={classes.root}>
            <div className={classes.background} />
            <Waypoint bottomOffset={'50%'} onEnter={() => setIsIn(true)} onLeave={({ currentPosition }) => currentPosition === 'below' ? setIsIn(false) : false} />
            <CardWheel isIn={isIn}>
                <IntroCard
                    header={whoCard.header}
                    textBoxes={whoCard.textBoxes}
                    index={0}
                />
                <IntroCard
                    header={whatCard.header}
                    textBoxes={whatCard.textBoxes}
                    listItems={whatCard.listItems}
                    index={1}
                />
                <IntroCard
                    header={whyCard.header}
                    listItems={whyCard.listItems}
                    index={2}
                />
            </CardWheel>
        </div >
    )
}

export default Home;
