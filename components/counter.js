/*
counter.js - Created by Felix
This formats the cookie value
*/
import Head from 'next/head';
import { useState, useEffect } from 'react'

export default function Counter({cookies, StoreCps, manualCpsDuration, clicks}){
  const [manualCps, setManualCps] = useState(0);

  useEffect(() => {
    setManualCps(clicks.length / manualCpsDuration);
  }, [clicks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setManualCps(clicks.filter(clickTime => Date.now() - clickTime <= manualCpsDuration * 1000).length / manualCpsDuration);
    }, manualCpsDuration);
    return () => clearInterval(interval);
  }, [clicks]);

  function prettyDisplay(c){
    var d = 1
    var n = ''
    if(c >= 10e15){
      d = 10e15
      n = 'quadrillion'
      // return Math.floor(c / 10e15) + ' quadrillion'
    }else if(c >= 10e12){
      d = 10e12
      n = 'trillion'
      // return Math.floor(c / 10e12) + ' trillion'
    }else if(c >= 10e9){
      d = 10e9
      n = 'billion'
      // return (Math.floor(c / 10e9 * 1000) / 1000) + ' billion'
    }else if(c >= 10e6){
      d = 10e6
      n = 'million'
      // return Math.floor(c / 10e6) + ' million'
    }
    return (Math.floor(c / d * 1000) / 1000) + ' ' + n

  }

  return (
    <>
      <Head>
        <title>{prettyDisplay(cookies) + (cookies != 1 ? ' cookies' : ' cookie')}</title>
      </Head>
      <h3 style={{fontVariantNumeric: 'tabular-nums', fontSize: '1.6rem'}}>{prettyDisplay(cookies)} {cookies != 1 ? 'cookies' : 'cookie'}</h3>
      <h4 style={{textAlign: 'center'}}>{prettyDisplay((manualCps + StoreCps).toPrecision(2))} CPS</h4>
    </>
  )
}
