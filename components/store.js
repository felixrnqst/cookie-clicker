/*
store.js - Created by Felix
The component which displays upgrades and allows the user to purchase them
*/
import styles from './store.module.scss'


const upgrades = [
  {name: 'Autoclick', description: 'Clicks the cookie automatically for you', price: 100, quantity: 0, max: -1, cps: 0.1},
  {name: 'Multiplier', description: 'Multiplies the amount of cookies a click produces', price: 200, quantitiy: 0, max: -1, cps: 1},
  {name: 'Bakery', description: 'An artisanal bakery that produces fresh cookies', price: 200, quantitiy: 0, max: -1, cps: 1},
]

export default function Store(props){
  return (
    <div className={styles.container}>
      <h3>Upgrades</h3>
      {upgrades.map(u =>
        (<div className={styles.storeItem}>
          <h4>{u.name}</h4>
          <p>{u.description}</p>
        </div>)
      )}
    </div>
  )
}
