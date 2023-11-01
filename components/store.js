/*
store.js - Created by Felix
The component which displays upgrades and allows the user to purchase them
*/
import { useState, useEffect, useRef } from 'react'

import styles from './store.module.scss'


const freq = 1000/60

var lastincrement = 0

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
    if(props.cookies < u.price){
      return;
    }
    props.setCookies(props.cookies - u.price)
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
    props.setCookies(props.cookies + u.price)
    props.setStoreState(s => {
      s[i] -= 1;
      return s
    })
  }

  function loop(){//This handles the upgrades
    timer.current += 1;
    // console.log(timer.current)
    //Need to increment based on CPS
    // var time = timer.current * freq //Time in millis
    // for(var u of props.upgrades){
    //   console.log(Math.abs(time % (u.cps * 1000)))
    //   if(props.storeState[u.name] > 0 && u.cps > 0 && Math.abs(time % (u.cps / 1000)) <= 1e-5){
    //     console.log('Incrementing!')
    //     console.log('Upgrade: ' + u.name)
    //     console.log(props.storeState[u.name] > 0)
    //     console.log(u.cps)
    //     console.log("Time since last increment: " + (time - lastincrement))
    //     lastincrement = time
    //
    //     props.setCookies((c) => c + props.storeState[u.name])
    //   }
    // }
  }

  return (
    <div className={styles.container}>
      <h3>Upgrades</h3>
      {props.upgrades.map(u =>
        (<div className={styles.storeItem} key={u.name}>
          <h4>{u.name} 🍪{u.price}</h4>
          <div className={styles.storeItemRow}>
            <p>{u.description}</p>
            <div className={styles.counter}>
              <span className={styles.change + (props.storeState[u.name] > 0 ? ' ' + styles.active : '')} onClick={() => decrement(u.name)}>-</span>
              <span>{props.storeState[u.name]}</span>
              <span className={styles.change + (props.cookies >= u.price ? ' ' + styles.active : '')} onClick={() => increment(u.name)}>+</span>
            </div>
          </div>
          <div className={styles.info}>
          +{u.cps}CPS
          </div>
        </div>)
      )}
    </div>
  )
}
