/*
counter.js - Created by Felix
This formats the cookie value
*/
import Head from 'next/head';
export default function Counter({cookies, cps}){

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
      <h4 style={{textAlign: 'center'}}>{cps} CPS</h4>
    </>
  )
}
