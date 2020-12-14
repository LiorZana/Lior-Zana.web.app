import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { socialNetIcons } from './iconImports.js';
import emailjs from 'emailjs-com';
emailjs.init('user_L36pfXeIRslhndQ5PiGjL')

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,100,100,0.1)'
    },
    fieldset: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1em 2em'
    },
    submitButton: {
        margin: '2rem 0 1rem 0',
        width: '8rem',
        height: '3rem'
    },
    iconButton: {
        width: 100,
        height: 100,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '70%'
    },
    content: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,100,100,0.2)',
        padding: '10rem 2rem',

    },
    contactMethods: {
        marginLeft: '1em'
    },
    inputs: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        '& >*': {
            margin: '0 1em'
        },
    }
}))

const contactMethods = [
    { icon: socialNetIcons.linkedin, address: 'https://www.linkedin.com/in/lior-zana-64851bb9/' },
    { icon: socialNetIcons.gmail, address: 'mailto:liorzana@gmail.com' },
    { icon: socialNetIcons.github, address: 'https://github.com/LiorZana' },
    { icon: socialNetIcons.facebook, address: 'https://www.facebook.com/Lior.Y.Zana/' },
]

const Contact = () => {
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
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

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <FormControl>
                    <form onSubmit={handleSubmit}>
                        <fieldset className={classes.fieldset}>
                            <legend><Typography style={{ padding: '0 0.5em' }}>Send me a message:</Typography></legend>
                            <div className={classes.inputs}>
                                <TextField required label='Name' id='name' type='text' name='name' />
                                <TextField required label='Email' id='email' type='email' name='email' />
                            </div>
                            <TextField style={{padding:'0 1em'}} required fullWidth label='Message' id='message' type='text' name='message' multiline rows={5} />
                            <Input type='submit' value='Send'>Hello</Input>
                        </fieldset>
                    </form>
                </FormControl>

                <div className={classes.contactMethods}>
                    <Typography variant='h5' style={{ alignSelf: 'center' }}>Or through any of these links:</Typography>
                    {contactMethods.map((contact, i) =>
                        <IconButton
                            classes={{ root: classes.iconButton }}
                            key={i}
                            component='a'
                            style={{ backgroundImage: `url(${contact.icon})` }}
                            href={contact.address}
                            target='_blank'
                            rel='noreferrer'
                        />
                    )}

                </div>
            </div>

        </div>
    )
}

export default Contact;
