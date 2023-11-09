/*
index.js - Created by Felix
This is the main page on the website and it will display the cookie clicker game
*/
import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'

import Header from '../components/header'
import CookieBackground from '../components/cookie-background'
import Counter from '../components/counter'
import Cookie from '../components/cookie'
import Store, { upgrades } from '../components/store'
import Popup from '../components/popup'
import RandomPhrase from '../components/random-phrase'
import RandomEvent from 'components/random-event'

import { prettyDisplay, displayCps } from '../components/counter'

import { getRandomCode } from './api/code'

export default function Home({randomCode}) {

  const [cookies, setCookies] = useState(0);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [accountPopup, setAccountPopup] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [storeState, setStoreState] = useState(Object.fromEntries(upgrades.map(i => [i.name, 0])));

  const [clicks, setClicks] = useState([]);
  const manualCpsDuration = 1 // in seconds
  const [manualCps, setManualCps] = useState(0);

  const [cookiesPerClick, setCookiesPerClick] = useState(1);
  const [cps, setCps] = useState(0);

  const [goldenCookiecountdown, setGoldenCookiecountdown] = useState(0);
  const [CPSTemporaryMultiplier, setCPSTemporaryMultiplier] = useState(1);

  const updateInterval = useRef();
  const clickInterval = useRef();
  const updateOverride = useRef(false);

  function reset(){
    // Put all stats to 0
    setCookies(0)
    setCPSTemporaryMultiplier(1)
    setGoldenCookiecountdown(0)
    for (let upgrade_name in storeState) {
      setStoreState(s => {
        s[upgrade_name] = 0;
        return s})
    }
  }


  const phrases = [
    (props) => `Seulement ${props.prettyCookies} cookies ? Pas ouf...`,
    (props) => `${props.cps} cookies per second? ${props.cps > 10 ? 'Great!' : 'You can do better...'}`,
    'In the cookie of life, friends are the chocolate chips.',
    'Make the world a better place one cookie at a time.',
    'Cookies are made of butter and love.',
    'I never met a cookie I didn’t like.',
    'Le cookie est beau n\'est-ce pas ?',
    'Cookies. Here today, gone tomorrow.',
    'If you can’t change the world with cookies, how can you change the world?',
    'Cookie is the answer. Who cares what the question is?',
    'Not without cookies, I won’t!',
    'You can’t eat just one cookie. It would get lonely.',
    'You’re the chocolate chip to my cookie.',
    'When in doubt, bake cookies.',
    'Get onboard the cookie train.',
    'Cookies are like duct tape. They can fix everything.',
    'It’s cookie o’clock.',
    'Come to the dark side. We have cookies.',
    'The fortune you seek is in another cookie.',
    'C\'est pour Nsigma ou quoi ?',
    'T\'as vu on a ecrit le jeu en anglais',
    'The cookie is a lie.',
    <>Recette de cookie : <br/>1 oeuf,<br/> 100g de beurre,<br/> 100g de sucre,<br/> 200g de farine,<br/> 1 pincee de sel,<br/> 1 sachet de levure,<br/> 200g de chocolat<br/></>,
  ]

  // DONE: Add break lines in recette de cookies (\n doesn't work for some reason ?) - in html one has to use <br>
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

    if(localStorage.getItem('mode') === 'local'){
      if(localStorage.getItem('cookies') !== null)
        setCookies(parseInt(localStorage.getItem('cookies')))
      if(localStorage.getItem('store') !== null)
        setStoreState(JSON.parse(localStorage.getItem('store')))
    }

    window.cookies = cookies; //We want to use window.cookies to be able to "hack" the game in the console

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
    localStorage.setItem('cookies', cookies)
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
    window.cookies += cookiesPerClick * CPSTemporaryMultiplier
    setCookies((cookies) => {
      localStorage.setItem("cookies", cookies+(cookiesPerClick * CPSTemporaryMultiplier));
      return cookies+(cookiesPerClick * CPSTemporaryMultiplier);
    })

  }

  useEffect(() => {

    clickInterval.current = setInterval(() => {
      setManualCps(cookiesPerClick * clicks.filter(clickTime => Date.now() - clickTime <= manualCpsDuration * 1000).length / manualCpsDuration);
    }, manualCpsDuration);
    setManualCps(cookiesPerClick * clicks.length / manualCpsDuration);
    return () => clearInterval(clickInterval.current);
  }, [clicks]);

  function userIconClick() {
    if(typeof userCode == ''){
      setButtonPopup(true)
    }else{
      setAccountPopup(true)
    }
  }


  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="Online cookie clicker game" />
        <link rel="icon" href="/cookie.png" />
      </Head>

      <main className={styles.main}>
        <CookieBackground>
          <RandomPhrase phrases={phrases} cps={displayCps(cps + manualCps)} prettyCookies={prettyDisplay(cookies)}/>
          <Header userCode={userCode} showPopup={userIconClick}/>
          <Counter cookies={cookies} storeCps={cps} manualCps={manualCps} cookiesPerClick={cookiesPerClick} CPSTemporaryMultiplier={CPSTemporaryMultiplier} goldenCookiecountdown={goldenCookiecountdown}/>
          <Cookie increment={increment} cookiesPerClick={cookiesPerClick} CPSTemporaryMultiplier={CPSTemporaryMultiplier}/>
          <Popup cookies={cookies} setCookies={setCookiesOverride} trigger={buttonPopup} setTrigger={setButtonPopup} accountPopup={accountPopup} setAccountPopup={setAccountPopup} userCode={userCode} setUserCode={setUserCode} storeState={storeState} setStoreState={setStoreState} randomCode={randomCode} reset={reset}/>
        </CookieBackground>
        <RandomEvent CPSTemporaryMultiplier={CPSTemporaryMultiplier} setCPSTemporaryMultiplier={setCPSTemporaryMultiplier} goldenCookiecountdown={goldenCookiecountdown} setGoldenCookiecountdown={setGoldenCookiecountdown}/>
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
