/*
index.js - Created by Felix
This is the background element for the cookie page - it will display an animated background
*/
import styles from './cookie-background.module.scss';
export default function CookieBackground({children}){
  return <div className={styles.background}>{children}</div>
}
