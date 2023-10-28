/*
cookie.js - Created by Felix
This is the cookie component which reacts to click and increments the cookie value
*/
import styles from './cookie.module.scss'

import Image from 'next/image'
import cookie from '../public/cookie.png'

import { motion } from 'framer-motion'

export default function Cookie(props){

  return (
  <div className={styles.container}>
    <motion.div
        style={{clipPath: "inset(3.5vh round 50%)"}}
        whileHover={{
        scale: 0.9,
        transition: { duration: 0.2 },
      }}
      onClick={() => props.increment()}
    >
      <Image layout='intrinsic' src={cookie}/>
    </motion.div>
  </div>)
}
