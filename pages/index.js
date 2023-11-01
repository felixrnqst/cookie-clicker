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
  const [cookies, setCookies] = useState(0);
  const [buttonPopup, setButtonPopup] = useState(false)

  const updateInterval = useRef()
  const updateOverride = useRef(false)

  useEffect(() => {// useEffect is run only once when the component is mounted
    setButtonPopup(localStorage.getItem("buttonPopup") !== null ? localStorage.getItem("buttonPopup") == 'true' : true);
    var c  = localStorage.getItem("cookies") !== null ? parseInt(localStorage.getItem("cookies")) : 0
    window.cookies = c //We want to use window.cookies to be able to "hack" the game in the console
    setCookies(c)
    updateInterval.current = setInterval(() => {
      if(window.cookies != cookies && !updateOverride.current){
        setCookies(window.cookies);
      }
    }, 1000/60)
  }, [])

  useEffect(() => {
    updateOverride.current = false;
    window.cookies = cookies
    localStorage.setItem("cookies", cookies);
  }, [cookies])

  useEffect(() => {
    localStorage.setItem("buttonPopup", buttonPopup ? 'true' : 'false');//Saves to localstorage to avoid having to see the dialog on every page load
  }, [buttonPopup])

  function increment(){
    updateOverride.current = true;
    setCookies((c) => {
      localStorage.setItem("cookies", c+1);
      return c+1
    })

  }

  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="Online cookie clicker game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CookieBackground>
          <Header/>
          <Counter cookies={cookies}/>
          <Cookie increment={increment}/>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}/>
        </CookieBackground>
        <Store cookies={cookies} setCookies={setCookies}/>

      </main>

      <footer className={styles.footer}>
        <a>Built by Felix, Guillaume, Etienne and Matthieu</a>
      </footer>
    </div>
  )
}
