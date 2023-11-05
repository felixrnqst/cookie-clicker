/*
randomphrase.js - Created by Guillaume
Add random floating phrase around the cookie
*/

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from "./random-phrase.module.scss"
import { prettyDisplay } from './counter';


export default function RandomPhrase({cookies}) {
    // TODO : ADD A LOT MORE FUNNY PHRASES
    // TODO Add more dynamic phrases
    // IDEA : Get random inspirational cookie quote from API
    const [phrases, setPhrases] = useState([
    'Le cookie est beau n\'est-ce pas ?',
    //'C\'est pour Nsigma ou quoi ?',
    //'T\'as vu on a ecrit le jeu en anglais',
    //'The cookie is a lie.',
    //<>Recette de cookie : <br/>1 oeuf,<br/> 100g de beurre,<br/> 100g de sucre,<br/> 200g de farine,<br/> 1 pincée de sel,<br/> 1 sachet de levure,<br/> 200g de chocolat<br/></>,
    `Seulement ${prettyDisplay(cookies)} cookies ? Pas ouf...`,
    ]);
    const [randomYStart, setRandomYStart] = useState(0);
    const [randomYEnd, setRandomYEnd] = useState(Math.floor(Math.random() * 80));
    const [randomIndex, setRandomIndex] = useState(0)
    const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
    const phraseChangeDuration = 6; //s

    useEffect(() => {
        if (phrases.indexOf(currentPhrase) === phrases.length - 1) {
            setPhrases(prevPhrases => {
            const newPhrases = prevPhrases.slice(0, -1);
            newPhrases.push(`Seulement ${prettyDisplay(cookies)} cookies ? Pas ouf...`);
            return newPhrases;
            });
            setCurrentPhrase(`Seulement ${prettyDisplay(cookies)} cookies ? Pas ouf...`);
    }
      }, [cookies])
    useEffect(() => {
        const newRandomPhrase = phrases[randomIndex];
        console.log("New phrase : " + newRandomPhrase)
        setCurrentPhrase(newRandomPhrase);
    }, [randomIndex]);

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
