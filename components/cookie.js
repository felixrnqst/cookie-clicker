/*
cookie.js - Created by Felix
This is the cookie component which reacts to click and increments the cookie value
*/
import styles from './cookie.module.scss'

import { useState } from 'react'

import Image from 'next/image'
import cookie from '../public/cookie.png'

import { motion } from 'framer-motion'

export default function Cookie(props){
  const [click, setClick] = useState(false);
  function animateClick(){
    setClick(true);
    setTimeout(() => setClick(false), 100)
  }

  return (
  <div className={styles.container}>
    <motion.div
      whileHover={{
        scale: 0.9,
        transition: { duration: 0.2 },
      }}>
      <motion.div
          style={{clipPath: "inset(3.5vh round 50%)"}}
          animate={{scale: click ? 1.1 : 1}}

          onTap={animateClick}
          onClick={() => props.increment()}
      >
        <Image layout='intrinsic' src={cookie}/>
      </motion.div>
    </motion.div>
  </div>)
}
