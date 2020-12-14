import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ProjectCard from './ProjectCard.js';
import projectImages from '../worksGifs/projectImagesImports';
import ProjectPopup from './ProjectPopup.js';
import PopupWrapper from '../containers/PopupWrapper.js';
import { techIcons } from './iconImports.js';
import './Works.css';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        padding: '10em 0 10em 0',
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
        description: 'An app that connects to a face recognition AI API and detects face in images. There is also a counter for showing the user how many entries he put through.',
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
        description: 'A "Social network" App that shows a current list of users(from API) and lets the user filter through them by name',
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


const Works = () => {
    const classes = useStyles();
    const [showPopup, setShowPopup] = useState(false);
    const [currentProject, setCurrentProject] = useState({});
    const [isHoveringPopupContent, setHoveringPopupContent] = useState(false);

    const handleWrapperClick = () => {
        if (!isHoveringPopupContent) {
            setShowPopup(false);
            setCurrentProject({});
        }
    }

    const handleShowPopup = (project) => {
        setCurrentProject(project);
        setShowPopup(true);
    }

    const handleClosePopup = () => {
        setCurrentProject({});
        setShowPopup(false);
    }

    const setIsHoveringContent = (isHovering) => {
        setHoveringPopupContent(isHovering)
    }

    return (
        <div>
            <Grid justify='center' container spacing={0} classes={{ root: classes.root }}>
                    {projects.map((project, i) =>
                        <Grid key={i} item sm={'auto'} md={4} lg={5}>
                            <ProjectCard content={{ front: project.name, back: project.description, image: project.images.screenshot }} onButtonClick={() => handleShowPopup(project)} />
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
