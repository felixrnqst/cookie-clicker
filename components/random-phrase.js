/*
randomphrase.js - Created by Guillaume
Add random floating phrase around the cookie
*/

import { useState, useEffect, useRef } from 'react';
const { motion } = require('framer-motion');
import styles from "./random-phrase.module.scss"
import { prettyDisplay } from './counter';

export default function RandomPhrase({phrases, cps, prettyCookies}) {
    const [randomYStart, setRandomYStart] = useState(0);
    const [randomYEnd, setRandomYEnd] = useState(Math.floor(Math.random() * 80));
    const [randomIndex, setRandomIndex] = useState(0)
    const phraseChangeDuration = 6;

    const containerRef = useRef();

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("Updating phrase")
            const newRandomIndex = Math.floor(Math.random() * phrases.length);
            setRandomIndex(newRandomIndex);
        }, phraseChangeDuration*1000);
        return () => clearInterval(interval);
    }, []);

    return (
      <div className={styles.container} ref={containerRef}>
            <Phrase currentPhrase={phrases[randomIndex]} containerRef={containerRef} cps={cps} prettyCookies={prettyCookies}/>
      </div>
    );
}

function Phrase(props){
  const [coordsState, setCoordsState] = useState([0,0])

  const intervalRef = useRef()
  const phraseRef = useRef()
  const coords = useRef([0,0])

  const update = useRef([true, true]) //To know which way to update

  useEffect(() => {
    if(intervalRef.current == null){
      intervalRef.current = setInterval(() => {
        const containerRect = props.containerRef.current.getBoundingClientRect();
        const phraseRect = phraseRef.current.getBoundingClientRect();

        if(update.current[0]){
          if(coords.current[0] + phraseRect.width < containerRect.right){
            coords.current[0]++;
          }else{
            coords.current[0]--;
            update.current[0] = false;
          }
        }else{
          if(coords.current[0] > containerRect.left){
            coords.current[0]--;
          }else{
            coords.current[0]++;
            update.current[0] = true;
          }
        }

        if(update.current[1]){
          if(coords.current[1] + phraseRect.height < containerRect.bottom){
            coords.current[1]++;
          }else{
            coords.current[1]--;
            update.current[1] = false;
          }
        }else{
          if(coords.current[1] > containerRect.top){
            coords.current[1]--;
          }else{
            coords.current[1]++;
            update.current[1] = true;
          }
        }
        setCoordsState([coords.current[0], coords.current[1]]);
      }, 1000/40)
    }
    return () => {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  return(
    <p className={styles.phrase} style={{transform: 'translateX(' + coordsState[0] + 'px) translateY(' + coordsState[1] + 'px)'}} ref={phraseRef}>
        {typeof props.currentPhrase == 'function' ? props.currentPhrase({cps: props.cps, prettyCookies: props.prettyCookies}) : props.currentPhrase}
    </p>
  )
}
