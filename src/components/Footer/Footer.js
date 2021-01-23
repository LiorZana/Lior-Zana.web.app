import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { footerIcons } from '../../utils/iconImports.js';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100vw',
        width: '100%',
        position: 'relative',
        bottom: 0,
        marginTop: 'auto',
        left: 0,
        right: 0,
        padding: '0 1vw',
        zIndex: 6,
        height: '3rem',
        backgroundColor: theme.palette.secondary.dark,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 -3px 10px 2px #000000aa',
    },
    iconButton: {
        width: 40,
        height: 40,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '70%',
        '&:hover': {
            backgroundColor: '#ffffff33'
        }
    },
    copyright: {
        fontSize: '1.4rem',
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('500')]: {
            fontSize: '1.2rem'
        },
        [theme.breakpoints.down('400')]: {
            fontSize: '0.9rem'
        },
    }
}))

const icons = [
    { name: 'Linkedin', icon: footerIcons.linkedin, address: 'https://www.linkedin.com/in/lior-zana-64851bb9/' },
    { name: 'Github', icon: footerIcons.github, address: 'https://github.com/LiorZana' },
    { name: 'Gmail', icon: footerIcons.gmail, address: 'mailto:liorzana@gmail.com' }
]

const Footer = ({ isIn }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant='h6' className={classes.copyright} component='p'>© Lior Zana 2020-2021</Typography>
            <div>
                {icons.map(({ name, icon, address }) => {
                    return <IconButton
                        classes={{ root: classes.iconButton }}
                        key={`${name} button`}
                        component='a'
                        style={{ backgroundImage: `url(${icon})` }}
                        aria-label={name}
                        role='link'
                        href={address}
                        target='_blank'
                        rel='noreferrer'
                    />
                })}
            </div>
        </div>
    )
}

export default Footer
