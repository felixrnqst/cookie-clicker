/*
random-event.js - Created by Guillaume
This gather all the random events that can happen to the player
*/
import React, { useState, useEffect, useRef } from "react";
import styles from './random-event.module.scss';
import { motion } from 'framer-motion';

export default function RandomEvent({CPSTemporaryMultiplier, setCPSTemporaryMultiplier, goldenCookiecountdown, setGoldenCookiecountdown}) {
    const [showImage, setShowImage] = useState(false);
    const [coordsState, setCoordsState] = useState([0,0])

    const intervalRef = useRef()
    const imageRef = useRef()
    const goldenCookiesShown = useRef(0)
    const coords = useRef([0,0])
    const update = useRef([true, true]) //To know which way to update
    const showImageRef = useRef(false)

    useEffect(() => {
      if(intervalRef.current == null){
        intervalRef.current = setInterval(() => {
          if(!showImageRef.current){
            return;
          }
          // const containerRect = props.containerRef.current.getBoundingClientRect();
          const phraseRect = imageRef.current.getBoundingClientRect();

          if(update.current[0]){
            if(coords.current[0] + phraseRect.width < window.innerWidth){
              coords.current[0]++;
            }else{
              coords.current[0]--;
              update.current[0] = false;
            }
          }else{
            if(coords.current[0] > 0){
              coords.current[0]--;
            }else{
              coords.current[0]++;
              update.current[0] = true;
            }
          }

          if(update.current[1]){
            if(coords.current[1] + phraseRect.height < window.innerHeight){
              coords.current[1]++;
            }else{
              coords.current[1]--;
              update.current[1] = false;
            }
          }else{
            if(coords.current[1] > 0){
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

    useEffect(() => {
        window.goldenCookie = () => {
          handleGoldenCookieClick();
        }
        window.showCookie = () => {
          const randomAppearance = Math.floor(Math.random() * 15) + 5; //Between 5 and 15s
          setShowImage(true);
          showImageRef.current = true;
          setCoordsState([Math.floor(Math.random() * window.innerWidth), Math.floor(Math.random() * window.innerHeight)])
          console.log("Showing image")
          setTimeout(() => {
              console.log("Hiding image")
              setShowImage(false);
              showImageRef.current = false;
          }, randomAppearance * 1000);
        }
        const randomTimeout = () => {
            // TODO : Raise time between each golden cookie
            // const randomTime = Math.floor(Math.random() * 5000) + 5000; //Between 5 and 10s
            const randomTime = Math.floor(Math.random() * 10 * 60) + 60 + 5 * 60 * goldenCookiesShown.current; //Between 1 and 10mins, for every golden cookie there's 5 mins more to wait
            const randomAppearance = Math.floor(Math.random() * 15) + 5; //Between 5 and 15s
            setTimeout(() => {
              if(goldenCookiecountdown <= 0){
                setShowImage(true);
                showImageRef.current = true;
                setCoords([Math.floor(Math.random() * window.innerWidth), Math.floor(Math.random() * window.innerHeight)])
                setTimeout(() => {
                    showImageRef.current = false;
                    setShowImage(false);
                    randomTimeout();
                }, randomAppearance * 1000);
              }
            }, randomTime * 1000);
        };
        randomTimeout();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setGoldenCookiecountdown(goldenCookiecountdown - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [goldenCookiecountdown]);

    useEffect(() => {
        console.log("CPSTemporaryMultiplier : " + CPSTemporaryMultiplier);
        if (CPSTemporaryMultiplier != 1) {
            const timeout = setTimeout(() => {
                setCPSTemporaryMultiplier(prevMultiplier => prevMultiplier / 7);
            }, goldenCookiecountdown * 1000 + 2000);
            console.log("goldenCookiecountdown : " + goldenCookiecountdown);
            return () => clearTimeout(timeout);
        }
    }, [CPSTemporaryMultiplier]);

    function handleGoldenCookieClick() {
        console.log("Golden cookie!");
        const randomTime = Math.floor(Math.random() * 60) + 40 //Between 40-100s
        goldenCookiesShown.current += 1;
        showImageRef.current = false;
        setShowImage(false);
        console.log(CPSTemporaryMultiplier)
        setCPSTemporaryMultiplier(prevMultiplier => prevMultiplier * 7);
        console.log(CPSTemporaryMultiplier)
        setGoldenCookiecountdown(randomTime);
    };

    return (
        <>
          {showImage && (
          <div className={styles.goldenCookieContainer} style={{transform: 'translateX(' + coordsState[0] + 'px) translateY(' + coordsState[1] + 'px)'}}>
            <motion.img
              ref={imageRef}
              src="/goldencookie.png"
              className={styles.goldenCookie}
              animate={{
                scale: [1, 2, 2, 1, 1]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1
              }}
              onClick={handleGoldenCookieClick}
            />
          </div>)}
        </>
    );
}
