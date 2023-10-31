/*
store.js - Created by Felix
The component which displays upgrades and allows the user to purchase them
*/
import {useState} from 'react'

import styles from './store.module.scss'


const upgrades = [
  {name: 'Autoclick', description: 'Clicks the cookie automatically for you', price: 20, quantity: 0, max: -1, cps: 0.1},
  {name: 'Multiplier', description: 'Multiplies the amount of cookies a click produces', price: 200, quantitiy: 0, max: -1, cps: 1},
  {name: 'Bakery', description: 'An artisanal bakery that produces fresh cookies', price: 200, quantitiy: 0, max: -1, cps: 1},
]

// There's surely better way to use storeState variable in other files (account.js here) but I only find this way...
export const ActualStoreState = Object.fromEntries(upgrades.map(i => [i.name, 0]));

export default function Store(props){
  const [storeState, setStoreState] = useState(ActualStoreState);

  function increment(i){
    var u = upgrades.filter(k => k.name == i)[0]
    if(props.cookies < u.price){
      return;
    }
    props.setCookies(props.cookies - u.price)
    setStoreState(s => {
      s[i] += 1;
      return s
    })
  }
  function decrement(i){
    var u = upgrades.filter(k => k.name == i)[0]
    if(storeState[i] <= 0){
      return;
    }
    props.setCookies(props.cookies + u.price)
    setStoreState(s => {
      s[i] -= 1;
      return s
    })
  }
  return (
    <div className={styles.container}>
      <h3>Upgrades</h3>
      {upgrades.map(u =>
        (<div className={styles.storeItem}>
          <h4>{u.name} 🍪{u.price}</h4>
          <div className={styles.storeItemRow}>
            <p>{u.description}</p>
            <div className={styles.counter}>
              <span className={styles.change + (storeState[u.name] > 0 ? ' ' + styles.active : '')} onClick={() => decrement(u.name)}>-</span>
              <span>{storeState[u.name]}</span>
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
