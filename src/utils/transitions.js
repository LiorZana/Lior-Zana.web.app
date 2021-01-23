
export const opacityTransition = (duration = 1000) => ({
    defaultStyle: {
        transition: `opacity ${duration}ms`,
        opacity: 0,
        pointerEvents: 'none'
    },
    transitionStyles: {
        entering: { opacity: 0, pointerEvents: 'none' },
        entered: { opacity: 1, pointerEvents: 'auto' },
        exiting: { opacity: 1, pointerEvents: 'auto' },
        exited: { opacity: 0, pointerEvents: 'none' }
    }
})

export const growTransition = (duration = 1000, transformOrigin = 'center') => ({
    defaultStyle: {
        transition: `all ${duration}ms ease-in-out`,
        transitionDelay: '500ms',
        transform: 'scaleX(0)',
        pointerEvents: 'none',
        transformOrigin: transformOrigin
    },
    transitionStyles: {
        entering: { transform: 'scaleX(0)', pointerEvents: 'none' },
        entered: { transform: 'scaleX(1)', pointerEvents: 'auto' },
        exiting: { transform: 'scaleX(1)', pointerEvents: 'auto' },
        exited: { transform: 'scaleX(0)', pointerEvents: 'none' }
    }
})

export const popInTransition = (duration = 1000, initialPosition = '0, 0') => ({
    defaultStyle: {
        transition: `all ${duration}ms ease-in-out`,
        transform: `translate(${initialPosition})`,
        pointerEvents: 'none'
    },
    transitionStyles: {
        entering: { transform: `translate(${initialPosition})`, pointerEvents: 'none' },
        entered: { transform: 'translate(0, 0)', pointerEvents: 'auto' },
        exiting: { transform: 'translate(0, 0)', pointerEvents: 'auto' },
        exited: { transform: `translate(${initialPosition})`, pointerEvents: 'none' },
    }
})

export const rotateTransition = (duration=1000, degrees=180, perspective='', isReversed=false) => ({
    defaultStyle: {
        transition: `all ${duration}ms ease-in-out`,
        mozTransition: `all ${duration}ms ease-in-out`,
        transform: `rotateY(${isReversed ? 0 : degrees}deg)`,
        transformStyle: 'preserve-3d',
        mozTransformStyle: 'preserve-3d',
        perspective: perspective,
    },
    transitionStyles: {
        entering: { transform: `rotateY(${isReversed ? 180 : 0}deg)` },
        entered: { transform: `rotateY(${isReversed ? 0 : 180}deg)` },
        exiting: { transform: `rotateY(${isReversed ? 0 : 180}deg)` },
        exited: { transform: `rotateY(${isReversed ? 180 : 0}deg)` }
    }
})