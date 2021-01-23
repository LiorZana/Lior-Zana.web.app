import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ProjectCard from './ProjectCard.js';
import projectImages from '../../worksGifs/projectImagesImports';
import ProjectPopup from './ProjectPopup.js';
import PopupWrapper from '../../containers/PopupWrapper.js';
import { techIcons } from '../../utils/iconImports.js';
import { Waypoint } from 'react-waypoint';
import './Works.css';

const background = 'linear-gradient(45deg, transparent 0%, transparent 51%,rgba(130, 130, 130,0.05) 51%, rgba(130, 130, 130,0.05) 71%,transparent 71%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 69%,rgba(130, 130, 130,0.05) 69%, rgba(130, 130, 130,0.05) 84%,transparent 84%, transparent 100%),linear-gradient(135deg, transparent 0%, transparent 37%,rgba(130, 130, 130,0.05) 37%, rgba(130, 130, 130,0.05) 73%,transparent 73%, transparent 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        maxWidth: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        position: 'relative',
        pointerEvents: 'none',
        padding: '2rem 0',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        minHeight: '100vh',
        height: '100%',
        width: '100vw',
        backgroundImage: background,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        zIndex: 0,
    },
    grid: {
        backgroundColor: 'rgba(171, 113, 61, 0.1)',
    }
}))


const projects = [
    {
        name: 'Draw and Share',
        images: projectImages.DrawAndShare,
        description: 'An app for drawing svg shapes and sharing them with friends. You can export the images as .svg or .png, and even upload it to your user gallery!',
        link: 'https://liorzana.github.io/Draw-And-Share/',
        techs: [
            { name: 'HTML', icon: techIcons.html },
            { name: 'CSS', icon: techIcons.css },
            { name: 'Javascript', icon: techIcons.javascript },
            { name: 'ReactJS', icon: techIcons.react },
            { name: 'MaterialUI', icon: techIcons.materialUI },
            { name: 'NodeJS', icon: techIcons.nodejs },
            { name: 'Express.JS', icon: techIcons.express },
            { name: 'MongoDB', icon: techIcons.mongodb },
            { name: 'Mongoose', icon: techIcons.mongoose },
            { name: 'Heroku', icon: techIcons.heroku }
        ]
    },
    {
        name: 'AI Face Recognition',
        images: projectImages.FaceRecog,
        description: 'An app that connects to a face recognition AI-API and detects faces in images. There is also a counter for showing the user how many entries he put through.',
        link: 'https://liorzana.github.io/faceRecogApp/',
        techs: [
            { name: 'HTML', icon: techIcons.html },
            { name: 'CSS', icon: techIcons.css },
            { name: 'Javascript', icon: techIcons.javascript },
            { name: 'ReactJS', icon: techIcons.react },
            { name: 'NodeJS', icon: techIcons.nodejs },
            { name: 'Express.JS', icon: techIcons.express },
            { name: 'PostgresQL', icon: techIcons.postgres },
            { name: 'Heroku', icon: techIcons.heroku }
        ]
    },
    {
        name: 'Robofriends',
        images: projectImages.Robofriends,
        description: 'A "Social network" App that shows a current list of users (from API) and lets the user filter through them by name',
        link: 'https://liorzana.github.io/robofriends/',
        techs: [
            { name: 'HTML', icon: techIcons.html },
            { name: 'CSS', icon: techIcons.css },
            { name: 'Javascript', icon: techIcons.javascript },
            { name: 'ReactJS', icon: techIcons.react },
            { name: 'NodeJS', icon: techIcons.nodejs },
            { name: 'Express.JS', icon: techIcons.express },
        ]
    },
    {
        name: 'Gradient Background Generator',
        images: projectImages.BGGEN,
        description: 'A website that lets the user create a gradient background to use in his own CSS environment',
        link: 'https://liorzana.github.io/BGGradientGen/',
        techs: [
            { name: 'HTML', icon: techIcons.html },
            { name: 'CSS', icon: techIcons.css },
            { name: 'Javascript', icon: techIcons.javascript },
        ]
    }
]

const defaultOpacityStyle = {
    transition: 'all 1s ease-in',
    opacity: 0,
}

const opacityTransitionStyles = {
    entering: { opacity: 0, pointerEvents: 'none', transform: 'scale(0)' },
    entered: { opacity: 1, pointerEvents: 'auto', transform: 'scale(1)' },
    exiting: { opacity: 1, pointerEvents: 'auto', transform: 'scale(1)' },
    exited: { opacity: 0, pointerEvents: 'none', transform: 'scale(0)' }
}

const Works = () => {
    const classes = useStyles();
    const [showPopup, setShowPopup] = useState(false);
    const [currentProject, setCurrentProject] = useState({});
    const [isHoveringPopupContent, setHoveringPopupContent] = useState(false);
    const [isIn, setIsIn] = useState(false);

    const handleShowPopup = (project) => {
        setCurrentProject(project);
        setShowPopup(true);
    }

    const handleClosePopup = () => {
        setCurrentProject({});
        setShowPopup(false);
    }

    const handleWrapperClick = () => {
        if (!isHoveringPopupContent) {
            handleClosePopup();
        }
    }


    const setIsHoveringContent = (isHovering) => {
        setHoveringPopupContent(isHovering)
    }

    return (
        <div className={classes.root} style={{ zIndex: showPopup ? 3 : 2 }}>
            <Waypoint bottomOffset={'50%'} onEnter={() => setIsIn(true)} onLeave={({ currentPosition }) => currentPosition === 'below' ? setIsIn(false) : false} />
            <div className={classes.background} />
            <Grid justify='center' alignContent='center' classes={{ root: classes.grid }} container spacing={0}>
                {projects.map((project, i) =>
                    <Grid key={i} item sm={'auto'} md={4} lg={5}>
                        <CSSTransition in={isIn} timeout={(i) * 8 * 50}>
                            {state =>
                                <ProjectCard
                                    style={{ ...defaultOpacityStyle, ...opacityTransitionStyles[state] }}
                                    content={{ front: project.name, back: project.description, image: project.images.screenshot }}
                                    onButtonClick={() => handleShowPopup(project)} />
                            }
                        </CSSTransition>
                    </Grid>
                )}


            </Grid>
            <TransitionGroup childFactory={child => React.cloneElement(child)}>
                {showPopup ?
                    <CSSTransition mountOnEnter unmountOnExit classNames={'popup'} timeout={1000} >
                        <PopupWrapper handleWrapperClick={handleWrapperClick}>
                            <ProjectPopup handleClosePopup={handleClosePopup} setIsHoveringContent={setIsHoveringContent} currentProject={currentProject} />
                        </PopupWrapper>

                    </CSSTransition>
                    :
                    false
                }
            </TransitionGroup>





        </div>

    )
}

export default Works
