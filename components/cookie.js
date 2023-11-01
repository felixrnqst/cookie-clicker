/*
cookie.js - Created by Felix
This is the cookie component which reacts to click and increments the cookie value
*/
import styles from './cookie.module.scss'

import { useState, useEffect, useRef } from 'react'

import Image from 'next/image'
import cookie from '../public/cookie.png'

import { motion, useAnimate } from 'framer-motion'
import useSound from 'use-sound';


export default function Cookie(props){
  const [click, setClick] = useState(false);
  const [coords, setCoords] = useState([0,0]);

  const mouseListener = useRef();

  const [scope, animate] = useAnimate()
  // Play a random click sound in public/audio folder
  const [playClickSound] = useSound('/audio/clickb' + Math.floor(Math.random() * 5 + 1) + '.mp3', { volume: 0.5 });

  async function tapHandler(e){
    // console.log(e)
    setCoords([e.clientX, e.clientY])
    setClick(true);
    setTimeout(() => setClick(false), 100)
    props.increment()
    
    playClickSound();
    await animate(scope.current, { opacity: 1, transform: 'translateX(-50%) translateY(-50%)' }, { duration: 0 })
    await animate(scope.current, { opacity: 0, transform: 'translateX(-50%) translateY(-5rem)'}, { duration: 1 })

  }
  
  return (
  <div className={styles.container}>
    <div className={styles.cursor} style={{top: coords[1], left: coords[0]}} ref={scope}>+1</div>
    <motion.div
      className={styles.hoverbox}
      whileHover={{
        scale: 0.9,
        transition: { duration: 0.2 },
      }}>
      <motion.div
          className={styles.cookie}
          animate={{scale: click ? 1.1 : 1}}

          onTap={tapHandler}
      >
        <Image layout='intrinsic' alt='cookie' src={cookie}/>
      </motion.div>
    </motion.div>
  </div>)
}
