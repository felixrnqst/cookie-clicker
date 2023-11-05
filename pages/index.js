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

import { getRandomCode } from './api/code'

export default function Home({randomCode}) {
  const upgrades = [
    {name: 'Autoclick', description: 'Clicks the cookie automatically for you', price: 20, quantity: 0, max: -1, cps: 0.1},
    {name: 'Multiplier', description: 'Multiplies the amount of cookies a click produces', price: 100, quantitiy: 0, max: -1, cps: 0, mult: 1.5},
    {name: 'Bakery', description: 'An artisanal bakery that produces fresh cookies', price: 200, quantitiy: 0, max: -1, cps: 5},
  ]
  const [cookies, setCookies] = useState(0);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [storeState, setStoreState] = useState(Object.fromEntries(upgrades.map(i => [i.name, 0])));

  const [cookiesPerClick, setCookiesPerClick] = useState(1);
  const [cps, setCps] = useState(0);

  const updateInterval = useRef();
  const updateOverride = useRef(false);

  useEffect(() => {// useEffect is run only once when the component is mounted

  console.log('  ____            _    _      ')
  console.log(' / ___|___   ___ | | _(_) ___ ')
  console.log('| |   / _ \\ / _ \\| |/ / |/ _ \\')
  console.log('| |__| (_) | (_) |   <| |  __/')
  console.log(' \\____\\___/ \\___/|_|\\_\\_|\\___|')
  console.log('__________________      ______              ')
  console.log('__  ____/__  /__(_)________  /______________')
  console.log('_  /    __  /__  /_  ___/_  //_/  _ \\_  ___/')
  console.log('/ /___  _  / _  / / /__ _  ,<  /  __/  /    ')
  console.log('\\____/  /_/  /_/  \\___/ /_/|_| \\___//_/     ')
  console.log('Built by Guillaume, Felix, Étienne, Matthieu')
    setButtonPopup(localStorage.getItem("buttonPopup") !== null ? localStorage.getItem("buttonPopup") == 'true' : true);
    window.cookies = cookies; //We want to use window.cookies to be able to "hack" the game in the console
    setCookies(cookies);
    updateInterval.current = setInterval(() => {
      var cook = 0;
      setCookies((i) => {
        cook = i;
        return i
      });
      if(window.cookies != cook){
        if(!updateOverride.current){
          setCookies(window.cookies);
        }else{
          updateOverride.current = false;
        }
      }
    }, 1000/60)
    return () => {
      clearInterval(updateInterval.current)
    }
  }, [])

  useEffect(() => {
    var inc = upgrades.filter(i => typeof i.mult != 'undefined' && i.mult > 1 && storeState[i.name] > 0).map(i => Math.pow(i.mult, storeState[i.name]))
    inc = Math.round(inc.reduce((a,c) => a * c, 1))
    setCookiesPerClick(inc);
    var cp = upgrades.filter(i => typeof i.cps != 'undefined' && i.cps > 0 && storeState[i.name] > 0).map(i => i.cps * storeState[i.name])
    cp = cp.reduce((a,c) => a + c, 0)
    setCps(cp)
  })

  useEffect(() => {
    updateOverride.current = false;
    window.cookies = cookies;
  }, [cookies])

  function setCookiesOverride(i){
    updateOverride.current = true;
    setCookies(i)
  }

  useEffect(() => {
    localStorage.setItem("buttonPopup", buttonPopup ? 'true' : 'false');//Saves to localstorage to avoid having to see the dialog on every page load
  }, [buttonPopup])

  function increment(){
    updateOverride.current = true;
    window.cookies += cookiesPerClick
    setCookies((cookies) => {
      localStorage.setItem("cookies", cookies+cookiesPerClick);
      return cookies+cookiesPerClick;
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
          <Header userCode={userCode}/>
          <Counter cookies={cookies} cps={cps}/>
          <Cookie increment={increment} cookiesPerClick={cookiesPerClick}/>
          <Popup cookies={cookies} setCookies={setCookiesOverride} trigger={buttonPopup} setTrigger={setButtonPopup} userCode={userCode} setUserCode={setUserCode} storeState={storeState} setStoreState={setStoreState} randomCode={randomCode}/>
        </CookieBackground>
        <Store cookies={cookies} setCookies={setCookiesOverride} upgrades={upgrades} storeState={storeState} setStoreState={setStoreState}/>

      </main>

      <footer className={styles.footer}>
        <a>Built by Felix, Guillaume, Etienne and Matthieu</a>
      </footer>
    </div>
  )
}

export function getServerSideProps(){
  return {
    props: {
      randomCode: getRandomCode()
    }
  }

}
