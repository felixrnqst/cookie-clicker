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
import RandomPhrase from '../components/randomphrase'

import { prettyDisplay } from '../components/counter'

import { getRandomCode } from './api/code'

export default function Home({randomCode}) {
  const upgrades = [
    {name: 'Autoclick', description: 'Clicks the cookie automatically for you', price: 20, quantity: 0, max: -1, cps: 0.1, imagePath: '/autoclick.png'},
    {name: 'Multiplier', description: 'Multiplies the amount of cookies a click produces', price: 100, quantitiy: 0, max: -1, cps: 0, mult: 1.5, imagePath: '/multiplier.png'},
    {name: 'Bakery', description: 'An artisanal bakery that produces fresh cookies', price: 200, quantitiy: 0, max: -1, cps: 5, imagePath: '/bakery.png'},
  ]
  const [cookies, setCookies] = useState(0);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [storeState, setStoreState] = useState(Object.fromEntries(upgrades.map(i => [i.name, 0])));

  const [clicks, setClicks] = useState([]);
  const manualCpsDuration = 1 //s
  const [cookiesPerClick, setCookiesPerClick] = useState(1);
  const [cps, setCps] = useState(0);

  const updateInterval = useRef();
  const updateOverride = useRef(false);
  

  // TODO : ADD A LOT MORE FUNNY PHRASES
  
  const [phrases, setPhrases] = useState([       
    'Le cookie est beau n\'est-ce pas ?',
    'C\'est pour Nsigma ou quoi ?',
    'T\'a vu on a ecrit le jeu en anglais',
    'The cookie is a lie.',
    `Recette de cookie : 1 oeuf, 100g de beurre, 100g de sucre, 200g de farine, 1 pincée de sel, 1 sachet de levure, 200g de chocolat`,
    `Seulement ${prettyDisplay(cookies)} cookies ? Pas ouf...`,
  ]);
  
  // TODO Add break lines in recette de cookies (\n doesn't work for some reason ?)
  // TODO Add more dynamic phrases
  // IDEA : Get random inspirationnal cookie quote from API

  useEffect(() => {// useEffect is run only once when the component is mounted
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
    // TODO Find a better way to dynamically update the needed phrases other than using ther last phrase of phrases array
    setPhrases(prevPhrases => {
      const newPhrases = prevPhrases.slice(0, -1); // Crée une nouvelle copie de phrases sans la dernière phrase
      newPhrases.push(`Seulement ${prettyDisplay(cookies)} cookies ? Pas ouf...`); // Ajoute la nouvelle phrase à la fin de la nouvelle copie
      return newPhrases;
    });
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
    setClicks(prevClicks => {
      const newClicks = [...prevClicks, Date.now()];
      return newClicks.filter(clickTime => Date.now() - clickTime <= manualCpsDuration * 1000);
    });
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
        <link rel="icon" href="/cookie.png" />
      </Head>

      <main className={styles.main}>
        <CookieBackground>
          <RandomPhrase cookies={cookies} phrases={phrases} storeState={storeState}/>
          <Header userCode={userCode}/>
          <Counter cookies={cookies} StoreCps={cps} manualCpsDuration={manualCpsDuration} clicks={clicks} cookiesPerClick={cookiesPerClick}/>
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
