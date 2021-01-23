import React, { useRef, useEffect } from 'react';
import Canvas from './Canvas.js';
import SimplexNoise from 'simplex-noise';
import * as Utils from './util.js';

const circleCount = 50;
const circlePropCount = 8;
const circlePropsLength = circleCount * circlePropCount;
const baseSpeed = 0.1;
const rangeSpeed = 0.8;
const baseTTL = 1000;
const rangeTTL = 2000;
const baseRadius = 2;
const rangeRadius = 30;
const rangeHue = 150;
const xOff = 0.0015;
const yOff = 0.0015;
const zOff = 0.0015;

//Based upon one of the amazing live-backgrounds by Sean Free over at https://tympanus.net/Development/AmbientCanvasBackgrounds/index3.html
//adjusted for my react project by me.

const ShiftBG = (props) => {

    const canvas1Ref = useRef(null);

    useEffect(() => {
        const canvas1 = canvas1Ref.current;
        const ctx1 = canvas1.getContext('2d');
        let circleProps, simplex, baseHue, radiusScale;

        const canvas = {
            a: canvas1,
        }

        const ctx = {
            a: ctx1,
        }

        const setup = () => {
            resize();
            initCircles();
            draw();
        }

        const getRadiusScale = (innerWidth) => {
            if (innerWidth > 1500) {
                return 1;
            } else if (innerWidth > 1300) {
                return 0.8
            } else if (innerWidth > 1000) {
                return 0.7;
            } else if (innerWidth > 700) {
                return 0.5;
            } else if (innerWidth > 500) {
                return 0.4;
            } else {
                return 0.3;
            }
            
        }

        const resize = () => {
            const { innerWidth, innerHeight } = window;

            canvas.a.width = innerWidth;
            canvas.a.height = innerHeight;

            radiusScale = getRadiusScale(innerWidth);

        }

        const initCircles = () => {
            circleProps = new Float32Array(circlePropsLength);
            simplex = new SimplexNoise();
            baseHue = 278;

            for (let i = 0; i < circlePropsLength; i += circlePropCount) {
                initCircle(circleProps, i);
            }
        }

        const initCircle = (i) => {
            const { rand, cos, sin, TAU } = Utils;
            let x, y, n, t, speed, vx, vy, life, ttl, radius, hue;
            x = rand(canvas.a.width);
            y = rand(canvas.a.height);
            n = simplex.noise3D(x * xOff, y * yOff, baseHue * zOff);
            t = rand(TAU);
            speed = baseSpeed + rand(rangeSpeed);
            vx = speed * cos(t);
            vy = speed * sin(t);
            life = 0;
            ttl = baseTTL + rand(rangeTTL);
            radius = baseRadius + rand(rangeRadius);
            hue = baseHue + n * rangeHue;

            circleProps.set([x, y, vx, vy, life, ttl, radius, hue], i);

        }


        const updateCircles = () => {
            baseHue++;
            for (let i = 0; i < circlePropsLength; i += circlePropCount) {
                updateCircle(i);
            }
        }

        const updateCircle = (i) => {
            let i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i;
            let x, y, vx, vy, life, ttl, radius, hue;

            x = circleProps[i];
            y = circleProps[i2];
            vx = circleProps[i3];
            vy = circleProps[i4];
            life = circleProps[i5];
            ttl = circleProps[i6];
            radius = circleProps[i7] * radiusScale;
            hue = circleProps[i8];

            drawCircle(x, y, life, ttl, radius, hue);

            life++;

            circleProps[i] = x + vx;
            circleProps[i2] = y + vy;
            circleProps[i5] = life;

            (checkBounds(x, y, radius) || life > ttl) && initCircle(i);
        }



        const drawCircle = (x, y, life, ttl, radius, hue) => {
            const { fadeInOut, TAU } = Utils;
            ctx.a.save();
            ctx.a.fillStyle = `hsla(${hue},100%,100%,${fadeInOut(life, ttl)})`;
            ctx.a.beginPath();
            ctx.a.arc(x, y, radius, 0, TAU);
            ctx.a.fill();
            ctx.a.closePath();
            ctx.a.restore();
        }

        const checkBounds = (x, y, radius) => {
            return (
                x < -radius ||
                x > canvas.a.width + radius ||
                y < -radius ||
                y > canvas.a.height + radius
            );
        }

        const render = () => {
        }

        const draw = () => {
            ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
            updateCircles();
            render();
            window.requestAnimationFrame(draw);
        }

        setup();
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        }
    }, [])



    return (
        <div {...props}>
            <Canvas ref={canvas1Ref} />
        </div>
    )
}

export default ShiftBG
