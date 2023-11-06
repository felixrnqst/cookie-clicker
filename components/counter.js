/*
counter.js - Created by Felix
This formats the cookie value
*/
import Head from 'next/head';
import { useState, useEffect } from 'react'

export function prettyDisplay(c) {
  const bigNumbers = [
    { divisor: 1e+303, name: 'centillion' },
    { divisor: 1e+300, name: 'novemnonagintillion' },
    { divisor: 1e+297, name: 'octononagintillion' },
    { divisor: 1e+294, name: 'septennonagintillion' },
    { divisor: 1e+291, name: 'sexnonagintillion' },
    { divisor: 1e+288, name: 'quinnonagintillion' },
    { divisor: 1e+285, name: 'quattuornonagintillion' },
    { divisor: 1e+282, name: 'trenonagintillion' },
    { divisor: 1e+279, name: 'duononagintillion' },
    { divisor: 1e+276, name: 'unnonagintillion' },
    { divisor: 1e+273, name: 'nonagintillion' },
    { divisor: 1e+270, name: 'novemoctogintillion' },
    { divisor: 1e+267, name: 'octooctogintillion' },
    { divisor: 1e+264, name: 'septenoctogintillion' },
    { divisor: 1e+261, name: 'sexoctogintillion' },
    { divisor: 1e+258, name: 'quinoctogintillion' },
    { divisor: 1e+255, name: 'quattuoroctogintillion' },
    { divisor: 1e+252, name: 'treoctogintillion' },
    { divisor: 1e+249, name: 'duooctogintillion' },
    { divisor: 1e+246, name: 'unoctogintillion' },
    { divisor: 1e+243, name: 'octogintillion' },
    { divisor: 1e+240, name: 'novemseptuagintillion' },
    { divisor: 1e+237, name: 'octoseptuagintillion' },
    { divisor: 1e+234, name: 'septenseptuagintillion' },
    { divisor: 1e+231, name: 'sexseptuagintillion' },
    { divisor: 1e+228, name: 'quinseptuagintillion' },
    { divisor: 1e+225, name: 'quattuorseptuagintillion' },
    { divisor: 1e+222, name: 'treseptuagintillion' },
    { divisor: 1e+219, name: 'duoseptuagintillion' },
    { divisor: 1e+216, name: 'unseptuagintillion' },
    { divisor: 1e+213, name: 'septuagintillion' },
    { divisor: 1e+210, name: 'novemsexagintillion' },
    { divisor: 1e+207, name: 'octosexagintillion' },
    { divisor: 1e+204, name: 'septensexagintillion' },
    { divisor: 1e+201, name: 'sexsexagintillion' },
    { divisor: 1e+198, name: 'quinsexagintillion' },
    { divisor: 1e+195, name: 'quattuorsexagintillion' },
    { divisor: 1e+192, name: 'tresexagintillion' },
    { divisor: 1e+189, name: 'duosexagintillion' },
    { divisor: 1e+186, name: 'unsexagintillion' },
    { divisor: 1e+183, name: 'sexagintillion' },
    { divisor: 1e+180, name: 'novemquinquagintillion' },
    { divisor: 1e+177, name: 'octoquinquagintillion' },
    { divisor: 1e+174, name: 'septenquinquagintillion' },
    { divisor: 1e+171, name: 'sexquinquagintillion' },
    { divisor: 1e+168, name: 'quinquinquagintillion' },
    { divisor: 1e+165, name: 'quattuorquinquagintillion' },
    { divisor: 1e+162, name: 'trequinquagintillion' },
    { divisor: 1e+159, name: 'duoquinquagintillion' },
    { divisor: 1e+156, name: 'unquinquagintillion' },
    { divisor: 1e+153, name: 'quinquagintillion' },
    { divisor: 1e+150, name: 'novemquadragintillion' },
    { divisor: 1e+147, name: 'octoquadragintillion' },
    { divisor: 1e+144, name: 'septenquadragintillion' },
    { divisor: 1e+141, name: 'sexquadragintillion' },
    { divisor: 1e+138, name: 'quinquadragintillion' },
    { divisor: 1e+135, name: 'quattuorquadragintillion' },
    { divisor: 1e+132, name: 'trequadragintillion' },
    { divisor: 1e+129, name: 'duoquadragintillion' },
    { divisor: 1e+126, name: 'unquadragintillion' },
    { divisor: 1e+123, name: 'quadragintillion' },
    { divisor: 1e+120, name: 'novemtrigintillion' },
    { divisor: 1e+117, name: 'octotrigintillion' },
    { divisor: 1e+114, name: 'septentrigintillion' },
    { divisor: 1e+111, name: 'sextrigintillion' },
    { divisor: 1e+108, name: 'quintrigintillion' },
    { divisor: 1e+105, name: 'quattuortrigintillion' },
    { divisor: 1e+102, name: 'tretrigintillion' },
    { divisor: 1e+99, name: 'duotrigintillion' },
    { divisor: 1e+96, name: 'untrigintillion' },
    { divisor: 1e+93, name: 'trigintillion' },
    { divisor: 1e+90, name: 'novemvigintillion' },
    { divisor: 1e+87, name: 'octovigintillion' },
    { divisor: 1e+84, name: 'septenvigintillion' },
    { divisor: 1e+81, name: 'sexvigintillion' },
    { divisor: 1e+78, name: 'quinvigintillion' },
    { divisor: 1e+75, name: 'quattuorvigintillion' },
    { divisor: 1e+72, name: 'trevigintillion' },
    { divisor: 1e+69, name: 'duovigintillion' },
    { divisor: 1e+66, name: 'unvigintillion' },
    { divisor: 1e+63, name: 'vigintillion' },
    { divisor: 1e+60, name: 'novemdecillion' },
    { divisor: 1e+57, name: 'octodecillion' },
    { divisor: 1e+54, name: 'septendecillion' },
    { divisor: 1e+51, name: 'sexdecillion' },
    { divisor: 1e+48, name: 'quindecillion' },
    { divisor: 1e+45, name: 'quattuordecillion' },
    { divisor: 1e+42, name: 'tredecillion' },
    { divisor: 1e+39, name: 'duodecillion' },
    { divisor: 1e+36, name: 'undecillion' },
    { divisor: 1e+33, name: 'decillion' },
    { divisor: 1e+30, name: 'nonillion' },
    { divisor: 1e+27, name: 'octillion' },
    { divisor: 1e+24, name: 'septillion' },
    { divisor: 1e+21, name: 'sextillion' },
    { divisor: 1e+18, name: 'quintillion' },
    { divisor: 1e+15, name: 'quadrillion' },
    { divisor: 1e+12, name: 'trillion' },
    { divisor: 1e+9, name: 'billion' },
    { divisor: 1e+6, name: 'million' },
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

export function displayCps(cps){
  if (cps < 1e+1) {
    return cps.toFixed(2);
  } else if (cps < 1e+2) {
    return cps.toFixed(1);
  } else if (cps < 1e+6) {
    return cps.toFixed(0);
  } else {
    return prettyDisplay(cps);
  }
}


export default function Counter({cookies, storeCps, manualCps, CPSTemporaryMultiplier}){
  const [cpsDisplay, setCpsDisplay] = useState(0);
  useEffect(() => {
    setCpsDisplay(displayCps((manualCps + storeCps) * CPSTemporaryMultiplier))
  },[CPSTemporaryMultiplier, manualCps, storeCps])

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
