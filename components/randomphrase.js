/*
randomphrase.js - Created by Guillaume
Add random floating phrase around the cookie
*/

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from "./randomphrase.module.scss"

export default function RandomPhrase({phrases, phrase, setPhrase}) {
    const [randomYStart, setRandomYStart] = useState(0);
    const [randomYEnd, setRandomYEnd] = useState(0);

    
    useEffect(() => {
        const interval = setInterval(() => {
            console.log("Updating phrase")
            const randomYStart = Math.floor(Math.random() * 100);
            const randomYEnd = Math.floor(Math.random() * 80); 
            const randomIndex = Math.floor(Math.random() * phrases.length);
            setPhrase(phrases[randomIndex]);
            setRandomYStart(randomYStart);
            setRandomYEnd(randomYEnd);
        }, 6*1000);
        return () => clearInterval(interval);
    }, []);

    return (
            <motion.text
                className={styles.phrase}
                initial={{ x: "0vw", y: `${randomYStart}vw`}}
                animate={{ x: "60vw", y: `${randomYEnd}vw`}}
                transition={{ duration: 10, repeat: Infinity }}
            >
                {phrase}
            </motion.text>
    );
}