/*
index.js - Created by Felix
This is the main page on the website and it will display the cookie clicker game
*/
import { useState, useEffect, useRef } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import Header from '../components/header'
import CookieBackground from '../components/cookie-background'
import Counter from '../components/counter'
import Cookie from '../components/cookie'
import Store from '../components/store'
import Popup from '../components/popup'

export default function Home() {
  const [cookies, setCookies] = useState(0)
  const updateInterval = useRef()
  const updateOverride = useRef(false)
  const [buttonPopup, setbuttonPopup] = useState(true)

  useEffect(() => {// useEffect is run only once when the component is mounted
    window.cookies = cookies //We want to use window.cookies to be able to "hack" the game in the console
    updateInterval.current = setInterval(() => {
      if(window.cookies != cookies && !updateOverride.current){
        setCookies(window.cookies);
      }
    }, 1000/60)
  }, [])

  useEffect(() => {
    updateOverride.current = false;
    window.cookies = cookies
  }, [cookies])

  function increment(){
    updateOverride.current = true;
    setCookies((c) => c+1)

  }



  //Window.cookies

  return (
    <div className={styles.container}>
      <Head>
        <title>{cookies} Cookies</title>
        <meta name="description" content="Online cookie clicker game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CookieBackground>
          <Header/>
          <Counter cookies={cookies}/>
          <Cookie increment={increment}/>
          <Popup trigger={buttonPopup} setTrigger={setbuttonPopup}/>
        </CookieBackground>
        <Store/>

      </main>

      <footer className={styles.footer}>
        <a>Built by Felix, Guillaume, Étienne and Matthieu</a>
      </footer>
    </div>
  )
}
