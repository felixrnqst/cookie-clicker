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
import Store, { upgrades } from '../components/store'
import Popup from '../components/popup'
import RandomPhrase from '../components/random-phrase'

import { prettyDisplay, displayCps } from '../components/counter'

import { getRandomCode } from './api/code'

export default function Home({randomCode}) {

  const [cookies, setCookies] = useState(0);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [storeState, setStoreState] = useState(Object.fromEntries(upgrades.map(i => [i.name, 0])));

  const [clicks, setClicks] = useState([]);
  const manualCpsDuration = 1 // in seconds
  const [manualCps, setManualCps] = useState(0);

  const [cookiesPerClick, setCookiesPerClick] = useState(1);
  const [cps, setCps] = useState(0);

  const updateInterval = useRef();
  const clickInterval = useRef();
  const updateOverride = useRef(false);


  // TODO : ADD A LOT MORE FUNNY PHRASES

  // const [phrases, setPhrases] = useState([
  const phrases = [
    (props) => `Seulement ${props.prettyCookies} cookies ? Pas ouf...`,
    (props) => `${props.cps} cookies per second? ${props.cps > 10 ? 'Great!' : 'You can do better...'}`,
    'Le cookie est beau n\'est-ce pas ?',
    'C\'est pour Nsigma ou quoi ?',
    'T\'as vu on a ecrit le jeu en anglais',
    'The cookie is a lie.',
    <>Recette de cookie : <br/>1 oeuf,<br/> 100g de beurre,<br/> 100g de sucre,<br/> 200g de farine,<br/> 1 pincee de sel,<br/> 1 sachet de levure,<br/> 200g de chocolat<br/></>,
  ]

  // ]);

  // DONE: Add break lines in recette de cookies (\n doesn't work for some reason ?) - in html one has to use <br>
  // TODO Add more dynamic phrases
  // IDEA : Get random inspirational cookie quote from API

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

  // useEffect(() => {
  //   setPhrases(prevPhrases => {
  //     var newPhrases = [...prevPhrases] //Copy array to mutable variable
  //     newPhrases[1] = `${cps} cookies per second? ${cps > 10 ? 'Great!' : 'You can do better...'}`
  //     return newPhrases;
  //   });
  // }, [cps])

  function setCookiesOverride(i){
    updateOverride.current = true;
    setCookies(i)
  }

  useEffect(() => {
    localStorage.setItem("buttonPopup", buttonPopup ? 'true' : 'false');//Saves to localstorage to avoid having to see the dialog on every page load
  }, [buttonPopup])

  function increment(){
    updateOverride.current = true;
    setClicks((prevClicks) => {
      var newClicks = [...prevClicks, Date.now()];
      newClicks = newClicks.filter(clickTime => Date.now() - clickTime <= manualCpsDuration * 1000);
      return newClicks;
    });
    window.cookies += cookiesPerClick
    setCookies((cookies) => {
      localStorage.setItem("cookies", cookies+cookiesPerClick);
      return cookies+cookiesPerClick;
    })

  }

  useEffect(() => {

    clickInterval.current = setInterval(() => {
      setManualCps(cookiesPerClick * clicks.filter(clickTime => Date.now() - clickTime <= manualCpsDuration * 1000).length / manualCpsDuration);
    }, manualCpsDuration);
    setManualCps(cookiesPerClick * clicks.length / manualCpsDuration);
    return () => clearInterval(clickInterval.current);
  }, [clicks]);

  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="Online cookie clicker game" />
        <link rel="icon" href="/cookie.png" />
      </Head>

      <main className={styles.main}>
        <CookieBackground>
          <RandomPhrase phrases={phrases} cps={displayCps(cps + manualCps)} prettyCookies={prettyDisplay(cookies)}/>
          <Header userCode={userCode}/>
          <Counter cookies={cookies} storeCps={cps} manualCps={manualCps} cookiesPerClick={cookiesPerClick}/>
          <Cookie increment={increment} cookiesPerClick={cookiesPerClick}/>

          <Popup cookies={cookies} setCookies={setCookiesOverride} trigger={buttonPopup} setTrigger={setButtonPopup} userCode={userCode} setUserCode={setUserCode} storeState={storeState} setStoreState={setStoreState} randomCode={randomCode}/>
        </CookieBackground>
        <Store cookies={cookies} setCookies={setCookiesOverride} storeState={storeState} setStoreState={setStoreState}/>

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
