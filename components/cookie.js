/*
cookie.js - Created by Felix
This is the cookie component which reacts to click and increments the cookie value
*/
import styles from './cookie.module.scss'

import { useState, useEffect, useRef } from 'react'

import Image from 'next/image'
import cookie from '../public/cookie.png'

import { motion } from 'framer-motion'

export default function Cookie(props){
  const [click, setClick] = useState(false);
  const [coords, setCoords] = useState([0,0]);
  const mouseListener = useRef();

  // useEffect(() => {
  //   mouseListener = document.addEventListener('mousemove', (e) => {
  //     console.log(e.mouseX, e.mouseY)
  //   })
  //   return () => {
  //
  //   }
  // })


  function tapHandler(e){
    // console.log(e)
    setCoords([e.clientX, e.clientY])
    setClick(true);
    setTimeout(() => setClick(false), 100)
    props.increment()
  }

  return (
  <div className={styles.container}>
    <div className={styles.cursor}/>
    <motion.div
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
