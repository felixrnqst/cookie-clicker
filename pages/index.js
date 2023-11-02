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
    setButtonPopup(localStorage.getItem("buttonPopup") !== null ? localStorage.getItem("buttonPopup") == 'true' : true);
    window.cookies = cookies; //We want to use window.cookies to be able to "hack" the game in the console
    setCookies(cookies);
    updateInterval.current = setInterval(() => {
      var cook = 0;
      setCookies((i) => {
        console.log(i)
        cook = i;
        return i
      });
      if(window.cookies != cook){
        console.log(window.cookies)
        console.log(cook)
        if(!updateOverride.current){
          console.log("Updating cookies from window!")
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
    console.log(cp)
    cp = cp.reduce((a,c) => a + c, 0)
    console.log(cp)
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
          <Popup setCookies={setCookies} trigger={buttonPopup} setTrigger={setButtonPopup} setUserCode={setUserCode} storeState={storeState} setStoreState={setStoreState}/>
        </CookieBackground>
        <Store cookies={cookies} setCookies={setCookiesOverride} upgrades={upgrades} storeState={storeState} setStoreState={setStoreState}/>

      </main>

      <footer className={styles.footer}>
        <a>Built by Felix, Guillaume, Etienne and Matthieu</a>
      </footer>
    </div>
  )
}
