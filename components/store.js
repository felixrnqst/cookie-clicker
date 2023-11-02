/*
store.js - Created by Felix
The component which displays upgrades and allows the user to purchase them
*/
import { useState, useEffect, useRef } from 'react'

import styles from './store.module.scss'


const freq = 1000/60

export default function Store(props) {
  const interval = useRef()
  const timer = useRef(0)

  useEffect(() => {
    interval.current = setInterval(loop, freq);
    return () => {
      clearInterval(interval.current);
    }
  }, [])

  function increment(i){
    var u = props.upgrades.filter(k => k.name == i)[0]
    if(props.cookies < Math.floor(u.price * (1 + 0.1 * props.storeState[u.name]))){
      return;
    }
    window.cookies = props.cookies - Math.floor(u.price * (1 + 0.1 * props.storeState[u.name]))
    props.setCookies(props.cookies - Math.floor(u.price * (1 + 0.1 * props.storeState[u.name])))
    props.setStoreState(s => {
      s[i] += 1;
      return s
    })
  }
  function decrement(i){
    var u = props.upgrades.filter(k => k.name == i)[0]
    if(props.storeState[i] <= 0){
      return;
    }
    window.cookies = props.cookies + Math.floor(u.price * (1 + 0.1 * (props.storeState[u.name] - 1)))
    props.setCookies(props.cookies + Math.floor(u.price * (1 + 0.1 * (props.storeState[u.name] - 1))))
    props.setStoreState(s => {
      s[i] -= 1;
      return s
    })
  }

  function loop(){//This handles the upgrades
    timer.current += 1;
    for(var u of props.upgrades){
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
      {props.upgrades.map(u =>
        (<div className={styles.storeItem} key={u.name}>
          <h4>{u.name} 🍪{Math.floor(u.price * (1 + 0.1 * props.storeState[u.name]))}</h4>
          <div className={styles.storeItemRow}>
            <p>{u.description}</p>
            <div className={styles.counter}>
              <span className={styles.change + (props.storeState[u.name] > 0 ? ' ' + styles.active : '')} onClick={() => decrement(u.name)}>-</span>
              <span>{props.storeState[u.name]}</span>
              <span className={styles.change + (props.cookies >= Math.floor(u.price * (1 + 0.1 * props.storeState[u.name])) ? ' ' + styles.active : '')} onClick={() => increment(u.name)}>+</span>
            </div>
          </div>
          <div className={styles.info}>
          {(typeof u.cps != 'undefined' &&u.cps > 0) && '+' + u.cps + ' CPS'}
          {(typeof u.mult != 'undefined' && u.mult > 1) && 'Click multiplier x' + u.mult}
          </div>
        </div>)
      )}
    </div>
  )
}
