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
  {name: 'Multiplier', description: 'Multiplies the amount of cookies a click produces', price: 100, max: -1, cps: 0, mult: 1.5, imagePath: '/multiplier.png'},
  {name: 'Bakery', description: 'An artisanal bakery that produces fresh cookies', price: 200,  max: -1, cps: 5, imagePath: '/bakery.png'},
  {name: 'Farm', description: 'Thanks to GMO, cookies can now be grown from plants!', price: 500, cps: 5, imagePath: '/unknown.png'},
  {name: 'Factory', description: 'The era of industrialisation brings mass-produced cookies!', price: 1000, cps: 10, imagePath: '/factory.png'}
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
      if(props.storeState[u.name] > 0 && u.cps > 0){
        if(u.cps < 1){
          if(timer.current % (1000 / (freq * u.cps)) < 1){
            props.setCookies((c) => c + props.storeState[u.name])
          }
        }else{
          if(timer.current % (1000 / (freq)) < 1){
            props.setCookies((c) => c + props.storeState[u.name] * u.cps)
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
          <Upgrade item={u} storeState={props.storeState} cookies={props.cookies} setCookies={props.setCookies} setStoreState={props.setStoreState}/>
        )}
      </div>
    </div>
  )
}

function Upgrade(props){
  const [playStoreSound] = useSound('/audio/buy' + Math.floor(Math.random() * 4 + 1) + '.mp3', { volume: 0.5 });

  function increment(i){
    var u = upgrades.filter(k => k.name == i)[0]
    if(props.cookies < Math.floor(u.price * (1 + 0.1 * props.storeState[u.name]))){
      return;
    }
    playStoreSound();
    window.cookies = props.cookies - Math.floor(u.price * (1 + 0.1 * props.storeState[u.name]))
    props.setCookies(props.cookies - Math.floor(u.price * (1 + 0.1 * props.storeState[u.name])))
    props.setStoreState(s => {
      s[i] += 1;
      return s
    })
  }
  function decrement(i){
    var u = upgrades.filter(k => k.name == i)[0]
    if(props.storeState[i] <= 0){
      return;
    }
    playStoreSound();
    window.cookies = props.cookies + Math.floor(u.price * (1 + 0.1 * (props.storeState[u.name] - 1)))
    props.setCookies(props.cookies + Math.floor(u.price * (1 + 0.1 * (props.storeState[u.name] - 1))))
    props.setStoreState(s => {
      s[i] -= 1;
      return s
    })
  }
  if(props.cookies < props.item.price * 0.9 && props.storeState[props.item.name] <= 0){
    return ""
  }
  if(props.cookies >= props.item.price * 0.9 && props.cookies < props.item.price && props.storeState[props.item.name] <= 0){
    return (
      <div className={styles.storeItem} key={props.item.name}>
        <h4>?? 🍪</h4>
        <div className={styles.storeItemRow}>
          <p></p>
          <div className={styles.counter}>
            <span className={styles.change} >-</span>
            <span>{props.storeState[props.item.name]}</span>
            <span className={styles.change}>+</span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.storeItem} key={props.item.name}>
      <h4>{props.item.name} 🍪{Math.floor(props.item.price * (1 + 0.1 * props.storeState[props.item.name]))}</h4>
      <div className={styles.storeItemRow}>
        <p>{props.item.description}</p>
        <div className={styles.counter}>
          <span className={styles.change + (props.storeState[props.item.name] > 0 ? ' ' + styles.active : '')} onClick={() => decrement(props.item.name)}>-</span>
          <span>{props.storeState[props.item.name]}</span>
          <span className={styles.change + (props.cookies >= Math.floor(props.item.price * (1 + 0.1 * props.storeState[props.item.name])) ? ' ' + styles.active : '')} onClick={() => increment(props.item.name)}>+</span>
        </div>
      </div>
      <div className={styles.upgradesImages + (props.storeState[props.item.name] > 0 ? " " + styles.visible : "" )}>
        {Array.from({ length: props.storeState[props.item.name] }, (_, i) => (
          <img key={i} className={styles.storeImage} src={props.item.imagePath} />
        ))}
      </div>
      <div className={styles.info}>
      {(typeof props.item.cps != 'undefined' && props.item.cps > 0) && '+' + props.item.cps + ' CPS'}
      {(typeof props.item.mult != 'undefined' && props.item.mult > 1) && 'Click multiplier x' + props.item.mult}
      </div>
    </div>)
}
