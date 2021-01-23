import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import { CSSTransition } from 'react-transition-group';
import { Waypoint } from 'react-waypoint';
import { socialNetIcons } from '../../utils/iconImports.js';
import { opacityTransition, growTransition } from '../../utils/transitions';
import { debounce } from '../../utils/functions';
import emailjs from 'emailjs-com';
emailjs.init('user_L36pfXeIRslhndQ5PiGjL');

const background = 'linear-gradient(22.5deg, rgba(242, 242, 242, 0.03) 0%, rgba(242, 242, 242, 0.03) 16%,rgba(81, 81, 81, 0.03) 16%, rgba(81, 81, 81, 0.03) 26%,rgba(99, 99, 99, 0.03) 26%, rgba(99, 99, 99, 0.03) 73%,rgba(43, 43, 43, 0.03) 73%, rgba(43, 43, 43, 0.03) 84%,rgba(213, 213, 213, 0.03) 84%, rgba(213, 213, 213, 0.03) 85%,rgba(125, 125, 125, 0.03) 85%, rgba(125, 125, 125, 0.03) 100%),linear-gradient(22.5deg, rgba(25, 25, 25, 0.03) 0%, rgba(25, 25, 25, 0.03) 54%,rgba(144, 144, 144, 0.03) 54%, rgba(144, 144, 144, 0.03) 60%,rgba(204, 204, 204, 0.03) 60%, rgba(204, 204, 204, 0.03) 76%,rgba(37, 37, 37, 0.03) 76%, rgba(37, 37, 37, 0.03) 78%,rgba(115, 115, 115, 0.03) 78%, rgba(115, 115, 115, 0.03) 91%,rgba(63, 63, 63, 0.03) 91%, rgba(63, 63, 63, 0.03) 100%),linear-gradient(157.5deg, rgba(71, 71, 71, 0.03) 0%, rgba(71, 71, 71, 0.03) 6%,rgba(75, 75, 75, 0.03) 6%, rgba(75, 75, 75, 0.03) 15%,rgba(131, 131, 131, 0.03) 15%, rgba(131, 131, 131, 0.03) 18%,rgba(110, 110, 110, 0.03) 18%, rgba(110, 110, 110, 0.03) 37%,rgba(215, 215, 215, 0.03) 37%, rgba(215, 215, 215, 0.03) 62%,rgba(5, 5, 5, 0.03) 62%, rgba(5, 5, 5, 0.03) 100%),linear-gradient(90deg, #ffffff,#ffffff)';

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `${theme.palette.primary.main}33`,
        position: 'relative',
        pointerEvents: 'none',
        zIndex: 0,
    },
    fieldset: {
        pointerEvents: 'auto',
        userSelect: 'none',
        display: 'flex',
        border: `1px solid black`,
        minWidth: '15rem',
        flexDirection: 'column',
        padding: '1em',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    submitButton: {
        margin: '4rem 0 1rem 0',
        width: '100%',
        height: '100%',
    },
    iconButton: {
        width: 100,
        height: 100,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '70%'
    },
    links: {
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.light,
        minHeight: '100vh',
        padding: '0 5rem',
        zIndex: 1,
        [theme.breakpoints.down('650')]: {
            padding: 0,
            width: '100%'
        }

    },
    contactMethods: {
        userSelect: 'none',
        paddingTop: '0.5rem',
        textAlign: 'center'
    },
    inputs: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        '& >*': {
            margin: '0 1rem',
            [theme.breakpoints.down('700')]: { width: '100%' }
        }
    },
    input: {
        fontSize: '1.2rem',
        [theme.breakpoints.down('700')]: {
            fontSize: '1rem',
        },
        '&>*': {
            color: theme.palette.secondary.light
        },
        '&.Mui-focused': {
            color: 'black',
        },
    },
    inputText: {
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

const contactMethods = [
    { icon: socialNetIcons.linkedin, address: 'https://www.linkedin.com/in/lior-zana-64851bb9/', name: 'Linkedin' },
    { icon: socialNetIcons.gmail, address: 'mailto:liorzana@gmail.com', name: 'Gmail' },
    { icon: socialNetIcons.github, address: 'https://github.com/LiorZana', name: 'Github' },
    { icon: socialNetIcons.facebook, address: 'https://www.facebook.com/Lior.Y.Zana/', name: 'Facebook' },
]


const defaultPopInStyle = opacityTransition(1000).defaultStyle;
const popInTransitionStyles = opacityTransition(1000).transitionStyles;

const defaultExtendStyle = growTransition(500).defaultStyle;
const extendTransitionStyles = growTransition(500).transitionStyles;


const Contact = () => {
    const classes = useStyles();
    const [isIn, setIsIn] = React.useState(false);


    const submitForm = (e) => {
        const name = e.target['name'].value;
        const email = e.target['email'].value;
        const message = e.target['message'].value;
        emailjs.send('service_ao6uphf', 'template_cadr2p4', { from_name: name, to_name: 'Lior', from_email: email, message: message })
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    const debounceForm = debounce((e) => submitForm(e), 2000);

    const handleSubmit = (e) => {
        e.preventDefault(e);
        debounceForm(e);
    }

    return (
        <div className={classes.root}>
            <div className={classes.background} />
            <Waypoint bottomOffset={'50%'} onEnter={() => setIsIn(true)} onLeave={({ currentPosition }) => currentPosition === 'below' ? setIsIn(false) : false} ><span style={{ position: 'absolute', top: 0 }} /></Waypoint>
            <CSSTransition in={isIn} appear timeout={100}>
                {state =>
                    <div className={classes.content} style={{ ...defaultExtendStyle, ...extendTransitionStyles[state] }}>
                        <CSSTransition in={isIn} timeout={{ enter: 1500, exit: 100 }}>
                            {state =>
                                <FormControl role='form' style={{ ...defaultPopInStyle, ...popInTransitionStyles[state] }}>
                                    <form method='post' onSubmit={handleSubmit} style={{ height: '100%' }}>
                                        <fieldset className={classes.fieldset}>
                                            <legend><Typography style={{ padding: '0 0.5em' }}>Send me a message:</Typography></legend>
                                            <div className={classes.inputs}>
                                                <TextField role='input' aria-required='true' aria-label='Name input' required label='Name' id='name' type='text' name='name' inputProps={{ className: classes.inputText }} InputLabelProps={{ classes: { root: classes.input } }} />
                                                <TextField role='input' aria-required='true' aria-label='E-mail input' required label='Email' id='email' type='email' name='email' inputProps={{ className: classes.inputText }} InputLabelProps={{ className: classes.input }} />
                                            </div>
                                            <TextField role='input' aria-required='true' aria-label='Message input' style={{ padding: '0 1rem', }} required fullWidth label='Message' id='message' type='text' name='message' multiline rows={4} inputProps={{ className: classes.inputText }} InputLabelProps={{ className: classes.input, style: { paddingLeft: '1rem' } }} />
                                            <Input role='button' aria-label='Submit form' style={{ color: 'white', marginTop: '0.5rem' }} type='submit' value='Send'>Hello</Input>
                                        </fieldset>
                                    </form>
                                </FormControl>
                            }
                        </CSSTransition>
                        <div className={classes.contactMethods}>
                            <CSSTransition in={isIn} timeout={{ enter: 1400, exit: 100 }}>
                                {state =>
                                    <Typography variant='h5' style={{ alignSelf: 'center', ...defaultPopInStyle, ...popInTransitionStyles[state] }}>Or through any of these links:</Typography>
                                }
                            </CSSTransition>
                            <div className={classes.links}>
                                {contactMethods.map((contact, i) =>
                                    <CSSTransition in={isIn} key={i} timeout={{ enter: i * 50 + 1000, exit: 100 }}>
                                        {state =>
                                            <IconButton
                                                classes={{ root: classes.iconButton }}
                                                key={i}
                                                component='a'
                                                style={{ backgroundImage: `url(${contact.icon})`, ...defaultPopInStyle, ...popInTransitionStyles[state] }}
                                                aria-label={contact.name}
                                                role='link'
                                                href={contact.address}
                                                target='_blank'
                                                rel='noreferrer'
                                            />
                                        }
                                    </CSSTransition>

                                )}
                            </div>


                        </div>
                    </div>

                }
            </CSSTransition>


        </div>
    )
}

export default Contact;
