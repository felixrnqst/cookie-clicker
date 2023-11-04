/*
randomphrase.js - Created by Guillaume
Add random floating phrase around the cookie
*/

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from "./random-phrase.module.scss"

export default function RandomPhrase({phrases}) {
    const [randomYStart, setRandomYStart] = useState(0);
    const [randomYEnd, setRandomYEnd] = useState(Math.floor(Math.random() * 80));
    const [randomIndex, setRandomIndex] = useState(0)
    const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
    const phraseChangeDuration = 6; //s

    useEffect(() => {
        setCurrentPhrase(phrases[randomIndex]);
    }, [phrases, randomIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("Updating phrase")
            const randomYStart = Math.floor(Math.random() * 100);
            const randomYEnd = Math.floor(Math.random() * 80);
            const newRandomIndex = Math.floor(Math.random() * phrases.length);
            setRandomIndex(newRandomIndex);
            setRandomYStart(randomYStart);
            setRandomYEnd(randomYEnd);
        }, phraseChangeDuration*1000);
        return () => clearInterval(interval);
    }, [phrases]);

    return (
            <motion.text
                className={styles.phrase}
                initial={{ x: "0vw", y: `${randomYStart}vw`}}
                animate={{ x: "60vw", y: `${randomYEnd}vw`}}
                transition={{ duration: 10, repeat: Infinity }}
            >
                {currentPhrase}
            </motion.text>
    );
}