/*
counter.js - Created by Felix
This formats the cookie value
*/
import Head from 'next/head';
import { useState, useEffect } from 'react'

export function prettyDisplay(c) {
  const bigNumbers = [
    { divisor: 10e+303, name: 'centillion' },
    { divisor: 10e+300, name: 'novemnonagintillion' },
    { divisor: 10e+297, name: 'octononagintillion' },
    { divisor: 10e+294, name: 'septennonagintillion' },
    { divisor: 10e+291, name: 'sexnonagintillion' },
    { divisor: 10e+288, name: 'quinnonagintillion' },
    { divisor: 10e+285, name: 'quattuornonagintillion' },
    { divisor: 10e+282, name: 'trenonagintillion' },
    { divisor: 10e+279, name: 'duononagintillion' },
    { divisor: 10e+276, name: 'unnonagintillion' },
    { divisor: 10e+273, name: 'nonagintillion' },
    { divisor: 10e+270, name: 'novemoctogintillion' },
    { divisor: 10e+267, name: 'octooctogintillion' },
    { divisor: 10e+264, name: 'septenoctogintillion' },
    { divisor: 10e+261, name: 'sexoctogintillion' },
    { divisor: 10e+258, name: 'quinoctogintillion' },
    { divisor: 10e+255, name: 'quattuoroctogintillion' },
    { divisor: 10e+252, name: 'treoctogintillion' },
    { divisor: 10e+249, name: 'duooctogintillion' },
    { divisor: 10e+246, name: 'unoctogintillion' },
    { divisor: 10e+243, name: 'octogintillion' },
    { divisor: 10e+240, name: 'novemseptuagintillion' },
    { divisor: 10e+237, name: 'octoseptuagintillion' },
    { divisor: 10e+234, name: 'septenseptuagintillion' },
    { divisor: 10e+231, name: 'sexseptuagintillion' },
    { divisor: 10e+228, name: 'quinseptuagintillion' },
    { divisor: 10e+225, name: 'quattuorseptuagintillion' },
    { divisor: 10e+222, name: 'treseptuagintillion' },
    { divisor: 10e+219, name: 'duoseptuagintillion' },
    { divisor: 10e+216, name: 'unseptuagintillion' },
    { divisor: 10e+213, name: 'septuagintillion' },
    { divisor: 10e+210, name: 'novemsexagintillion' },
    { divisor: 10e+207, name: 'octosexagintillion' },
    { divisor: 10e+204, name: 'septensexagintillion' },
    { divisor: 10e+201, name: 'sexsexagintillion' },
    { divisor: 10e+198, name: 'quinsexagintillion' },
    { divisor: 10e+195, name: 'quattuorsexagintillion' },
    { divisor: 10e+192, name: 'tresexagintillion' },
    { divisor: 10e+189, name: 'duosexagintillion' },
    { divisor: 10e+186, name: 'unsexagintillion' },
    { divisor: 10e+183, name: 'sexagintillion' },
    { divisor: 10e+180, name: 'novemquinquagintillion' },
    { divisor: 10e+177, name: 'octoquinquagintillion' },
    { divisor: 10e+174, name: 'septenquinquagintillion' },
    { divisor: 10e+171, name: 'sexquinquagintillion' },
    { divisor: 10e+168, name: 'quinquinquagintillion' },
    { divisor: 10e+165, name: 'quattuorquinquagintillion' },
    { divisor: 10e+162, name: 'trequinquagintillion' },
    { divisor: 10e+159, name: 'duoquinquagintillion' },
    { divisor: 10e+156, name: 'unquinquagintillion' },
    { divisor: 10e+153, name: 'quinquagintillion' },
    { divisor: 10e+150, name: 'novemquadragintillion' },
    { divisor: 10e+147, name: 'octoquadragintillion' },
    { divisor: 10e+144, name: 'septenquadragintillion' },
    { divisor: 10e+141, name: 'sexquadragintillion' },
    { divisor: 10e+138, name: 'quinquadragintillion' },
    { divisor: 10e+135, name: 'quattuorquadragintillion' },
    { divisor: 10e+132, name: 'trequadragintillion' },
    { divisor: 10e+129, name: 'duoquadragintillion' },
    { divisor: 10e+126, name: 'unquadragintillion' },
    { divisor: 10e+123, name: 'quadragintillion' },
    { divisor: 10e+120, name: 'novemtrigintillion' },
    { divisor: 10e+117, name: 'octotrigintillion' },
    { divisor: 10e+114, name: 'septentrigintillion' },
    { divisor: 10e+111, name: 'sextrigintillion' },
    { divisor: 10e+108, name: 'quintrigintillion' },
    { divisor: 10e+105, name: 'quattuortrigintillion' },
    { divisor: 10e+102, name: 'tretrigintillion' },
    { divisor: 10e+99, name: 'duotrigintillion' },
    { divisor: 10e+96, name: 'untrigintillion' },
    { divisor: 10e+93, name: 'trigintillion' },
    { divisor: 10e+90, name: 'novemvigintillion' },
    { divisor: 10e+87, name: 'octovigintillion' },
    { divisor: 10e+84, name: 'septenvigintillion' },
    { divisor: 10e+81, name: 'sexvigintillion' },
    { divisor: 10e+78, name: 'quinvigintillion' },
    { divisor: 10e+75, name: 'quattuorvigintillion' },
    { divisor: 10e+72, name: 'trevigintillion' },
    { divisor: 10e+69, name: 'duovigintillion' },
    { divisor: 10e+66, name: 'unvigintillion' },
    { divisor: 10e+63, name: 'vigintillion' },
    { divisor: 10e+60, name: 'novemdecillion' },
    { divisor: 10e+57, name: 'octodecillion' },
    { divisor: 10e+54, name: 'septendecillion' },
    { divisor: 10e+51, name: 'sexdecillion' },
    { divisor: 10e+48, name: 'quindecillion' },
    { divisor: 10e+45, name: 'quattuordecillion' },
    { divisor: 10e+42, name: 'tredecillion' },
    { divisor: 10e+39, name: 'duodecillion' },
    { divisor: 10e+36, name: 'undecillion' },
    { divisor: 10e+33, name: 'decillion' },
    { divisor: 10e+30, name: 'nonillion' },
    { divisor: 10e+27, name: 'octillion' },
    { divisor: 10e+24, name: 'septillion' },
    { divisor: 10e+21, name: 'sextillion' },
    { divisor: 10e+18, name: 'quintillion' },
    { divisor: 10e+15, name: 'quadrillion' },
    { divisor: 10e+12, name: 'trillion' },
    { divisor: 10e+9, name: 'billion' },
    { divisor: 10e+6, name: 'million' },
  ];

  // Limit of cookies, after which it will display Infinity
  if (c > 1e+303) {
    return Infinity;
  }
  for (let i = 0; i < bigNumbers.length; i++) {
    const { divisor, name } = bigNumbers[i];
    if (c >= divisor) {
      return (Math.floor(c / divisor * 1000) / 1000) + ' ' + name;
    }
  }
  return c.toString();
}


export default function Counter({cookies, StoreCps, manualCpsDuration, clicks, cookiesPerClick}){
  const [manualCps, setManualCps] = useState(0);
  const [cpsDisplay, setCpsDisplay] = useState(0);

  useEffect(() => {
    setManualCps(cookiesPerClick * clicks.length / manualCpsDuration);
  }, [clicks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setManualCps(cookiesPerClick * clicks.filter(clickTime => Date.now() - clickTime <= manualCpsDuration * 1000).length / manualCpsDuration);
    }, manualCpsDuration);
    return () => clearInterval(interval);
  }, [clicks]);
  
  useEffect(() => {
    if (manualCps + StoreCps < 1e+1) {
      setCpsDisplay((manualCps + StoreCps).toFixed(2));
    } else if (manualCps + StoreCps < 1e+2) {
      setCpsDisplay((manualCps + StoreCps).toFixed(1));
    } else if (manualCps + StoreCps < 1e+6) {
      setCpsDisplay((manualCps + StoreCps).toFixed(0));
    
    } else {
      setCpsDisplay(prettyDisplay(manualCps + StoreCps));
    }
    },[manualCps, StoreCps])
  
  


  return (
    <>
      <Head>
        <title>{prettyDisplay(cookies) + (cookies != 1 ? ' cookies' : ' cookie')} - Group 1 Cookie Clicker</title>
      </Head>
      <h3 style={{fontVariantNumeric: 'tabular-nums', fontSize: '1.6rem'}}>{prettyDisplay(cookies)} {cookies != 1 ? 'cookies' : 'cookie'}</h3>
      <h4 style={{textAlign: 'center'}}>{cpsDisplay} CPS</h4>
    </>
  )
}

