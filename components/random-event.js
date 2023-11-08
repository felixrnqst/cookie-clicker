/*
random-event.js - Created by Guillaume
This gather all the random events that can happen to the player
*/
import React, { useState, useEffect } from "react";
import styles from './random-event.module.scss';
import { motion } from 'framer-motion';

export default function RandomEvent({CPSTemporaryMultiplier, setCPSTemporaryMultiplier, GoldenCookiecountdown, setGoldenCookiecountdown}) {
    const [showImage, setShowImage] = useState(false);
    const [randomStartX, setRandomStartX] = useState(0);
    const [randomStartY, setRandomStartY] = useState(0);
    const [randomEndX, setRandomEndX] = useState(0);
    const [randomEndY, setRandomEndY] = useState(0);

    useEffect(() => {
        const randomTimeout = () => {
            // TODO : Raise time between each golden cookie
            const randomTime = Math.floor(Math.random() * 5000) + 5000; 
            setTimeout(() => {
                setShowImage(true);
                console.log("Image shown");
                setRandomStartX(Math.floor(Math.random() * 60) + 1);
                setRandomStartY(Math.floor(Math.random() * 60) + 1);
                setRandomEndX(Math.floor(Math.random() * 60) + 1);
                setRandomEndY(Math.floor(Math.random() * 60) + 1);
                setTimeout(() => {
                    setShowImage(false);
                    console.log("Image hidden");
                    randomTimeout();
                }, 5000);
            }, randomTime);
        };
        randomTimeout();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setGoldenCookiecountdown(GoldenCookiecountdown - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [GoldenCookiecountdown]);

    useEffect(() => {
        console.log("CPSTemporaryMultiplier : " + CPSTemporaryMultiplier);
        if (CPSTemporaryMultiplier != 1) {
            const timeout = setTimeout(() => {
                setCPSTemporaryMultiplier(prevMultiplier => prevMultiplier / 7);
            }, GoldenCookiecountdown * 1000 + 2000);
            console.log("GoldenCookiecountdown : " + GoldenCookiecountdown);
            return () => clearTimeout(timeout);
        }
    }, [CPSTemporaryMultiplier]);

    function handleGoldenCookieClick() {
        console.log("Golden cookie clicked !");
        const randomTime = Math.floor(Math.random() * 30) + 70

        setShowImage(false);
        console.log(CPSTemporaryMultiplier)
        setCPSTemporaryMultiplier(prevMultiplier => prevMultiplier * 7);
        console.log(CPSTemporaryMultiplier)
        setGoldenCookiecountdown(randomTime);
    };

    return (
        <div>
            {showImage && (
                <motion.img
                    className={styles.goldenCookie}
                    src="/goldencookie.png"
                    initial={{ x: `${randomStartX}vw`, y: `${randomStartY}vw`}}
                    animate={{ x: `${randomEndX}vw`, y: `${randomEndY}vw`}}
                    transition={{ duration: 10, repeat: Infinity }}
                    onClick={handleGoldenCookieClick}
                />
            )}
            {GoldenCookiecountdown > 0 && (
                <div className={styles.goldenCookieCountdownPanel}>
                    {GoldenCookiecountdown > 1 ? GoldenCookiecountdown +" seconds" : ""}
                    {CPSTemporaryMultiplier > 1 ? " (x" + CPSTemporaryMultiplier + ")" : ""}
                </div>
            )}
        </div>
    );
}