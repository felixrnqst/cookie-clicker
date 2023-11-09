/*
store.js - Created by Felix
The component which displays upgrades and allows the user to purchase them
*/
import { useState, useEffect, useRef } from 'react'

import styles from './store.module.scss'
import useSound from 'use-sound';

const freq = 1000/60

export const upgrades = [
  {name: 'Autoclick', description: 'Clicks the cookie automatically for you', price: 20, max: -1, cps: 0.1, imagePath: '/autoclick.png'},
  {name: 'Multiplier', description: 'Multiplies the amount of cookies a click produces', price: 50, max: -1, cps: 0, mult: 1.3, imagePath: '/multiplier.png'},
  {name: 'Bakery', description: 'An artisanal bakery that produces fresh cookies', price: 200,  max: -1, cps: 5, imagePath: '/bakery.png'},
  {name: 'Super Multiplier', description: 'A multiplier on steroids', price: 250, max: -1, cps: 0, mult: 1.7, imagePath: '/multiplier.png'},
  {name: 'Farm', description: 'Thanks to GMO, cookies can now be grown from plants!', price: 500, cps: 5, imagePath: '/farm.png'},
  {name: 'Factory', description: 'The era of industrialisation brings mass-produced cookies!', price: 1000, cps: 10, imagePath: '/factory.png'},
  {name: 'Super Factory', description: 'A new production line increases cps', price: 10000, cps: 30, imagePath: '/super-factory.png'},
  {name: 'A.I. Cookies', description: 'Chips embedded in cookies allow them to multiply!', price: 100000, cps: 100, imagePath: '/ai-cookie.png'}
]

export default function Store(props) {
  const interval = useRef()
  const timer = useRef(0)

  useEffect(() => {
    interval.current = setInterval(loop, freq);
    return () => {
      clearInterval(interval.current);
    }
  }, [])



  function loop(){//This handles the upgrades
    timer.current += 1;
    for(var u of upgrades){
      if((typeof props.storeState[u.name] != 'undefined' ? props.storeState[u.name] : 0) > 0 && u.cps > 0){
        if(u.cps < 1){
          if(timer.current % (1000 / (freq * u.cps)) < 1){
            props.setCookies((c) => c + (typeof props.storeState[u.name] != 'undefined' ? props.storeState[u.name] : 0))
          }
        }else{
          if(timer.current % (1000 / (freq)) < 1){
            props.setCookies((c) => c + (typeof props.storeState[u.name] != 'undefined' ? props.storeState[u.name] : 0) * u.cps)
          }
        }

      }
    }
  }

  return (
    <div className={styles.container}>
      <h3>Upgrades</h3>
      <div className={styles.upgrades}>
        {upgrades.map(u =>
          <Upgrade key={u.name} item={u} storeState={props.storeState} cookies={props.cookies} setCookies={props.setCookies} setStoreState={props.setStoreState}/>
        )}
      </div>
    </div>
  )
}

function Upgrade(props){
  const [playStoreSound] = useSound('/audio/buy' + Math.floor(Math.random() * 4 + 1) + '.mp3', { volume: 0.5 });

  function increment(i){
    var u = upgrades.filter(k => k.name == i)[0]
    if(props.cookies < Math.floor(u.price * (1 + 0.1 * (typeof props.storeState[u.name] != 'undefined' ? props.storeState[u.name] : 0)))){
      return;
    }
    playStoreSound();
    window.cookies = props.cookies - Math.floor(u.price * (1 + 0.1 * (typeof props.storeState[u.name] != 'undefined' ? props.storeState[u.name] : 0)))
    props.setCookies(props.cookies - Math.floor(u.price * (1 + 0.1 * (typeof props.storeState[u.name] != 'undefined' ? props.storeState[u.name] : 0))))
    props.setStoreState(s => {
      if(typeof s[i] != 'undefined'){
        s[i] += 1;
      }else{
        s[i] = 1;
      }
      localStorage.setItem('upgrades', JSON.stringify(s))
      return s
    })
  }
  function decrement(i){
    var u = upgrades.filter(k => k.name == i)[0]
    if(props.storeState[i] <= 0){
      return;
    }
    playStoreSound();
    window.cookies = props.cookies + Math.floor(u.price * (1 + 0.1 * ((typeof props.storeState[u.name] != 'undefined' ? props.storeState[u.name] : 0) - 1)))
    props.setCookies(props.cookies + Math.floor(u.price * (1 + 0.1 * ((typeof props.storeState[u.name] != 'undefined' ? props.storeState[u.name] : 0) - 1))))
    props.setStoreState(s => {
      s[i] -= 1;
      return s
    })
  }
  if(props.cookies < props.item.price * 0.9 && (typeof props.storeState[props.item.name] != 'undefined' ? props.storeState[props.item.name] : 0) <= 0 && props.item.name != 'Autoclick'){
    return ""
  }
  if(props.cookies >= props.item.price * 0.9 && props.cookies < props.item.price && (typeof props.storeState[props.item.name] != 'undefined' ? props.storeState[props.item.name] : 0) <= 0 && props.item.name != 'Autoclick'){
    return (
      <div className={styles.storeItem} key={props.item.name}>
        <h4>?? 🍪</h4>
        <div className={styles.storeItemRow}>
          <p></p>
          <div className={styles.counter}>
            <span className={styles.change} >-</span>
            <span>{(typeof props.storeState[props.item.name] != 'undefined' ? props.storeState[props.item.name] : 0)}</span>
            <span className={styles.change}>+</span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.storeItem}>
      <h4>{props.item.name} 🍪{Math.floor(props.item.price * (1 + 0.1 * (typeof (typeof props.storeState[props.item.name] != 'undefined' ? props.storeState[props.item.name] : 0) != 'undefined' ? (typeof props.storeState[props.item.name] != 'undefined' ? props.storeState[props.item.name] : 0) : 0)))}</h4>
      <div className={styles.storeItemRow}>
        <p>{props.item.description}</p>
        <div className={styles.counter}>
          <span className={styles.change + ((typeof props.storeState[props.item.name] != 'undefined' ? props.storeState[props.item.name] : 0) > 0 ? ' ' + styles.active : '')} onClick={() => decrement(props.item.name)}>-</span>
          <span>{typeof (typeof props.storeState[props.item.name] != 'undefined' ? props.storeState[props.item.name] : 0) != 'undefined' ? (typeof props.storeState[props.item.name] != 'undefined' ? props.storeState[props.item.name] : 0) : 0}</span>
          <span className={styles.change + (props.cookies >= Math.floor(props.item.price * (1 + 0.1 * (typeof props.storeState[props.item.name] != 'undefined' ? props.storeState[props.item.name] : 0))) ? ' ' + styles.active : '')} onClick={() => increment(props.item.name)}>+</span>
        </div>
      </div>
      <div className={styles.upgradesImages + ((typeof props.storeState[props.item.name] != 'undefined' ? props.storeState[props.item.name] : 0) > 0 ? " " + styles.visible : "" )}>
        {Array.from({ length: (typeof props.storeState[props.item.name] != 'undefined' ? props.storeState[props.item.name] : 0) }, (_, i) => (
          <img key={i} className={styles.storeImage} src={props.item.imagePath} />
        ))}
      </div>
      <div className={styles.info}>
      {(typeof props.item.cps != 'undefined' && props.item.cps > 0) && '+' + props.item.cps + ' CPS'}
      {(typeof props.item.mult != 'undefined' && props.item.mult > 1) && 'Click multiplier x' + props.item.mult}
      </div>
    </div>)
}
