/*
popup.js - Created by Guillaume
This create the inital popup for the user to choose saving his progress or not
*/
import React from "react";
import styles from './popup.module.scss';


// The close button is temporary for development
export default function Popup(props) {
  return (props.trigger) ? (
    <div className={styles.popup}> 
      <div className={styles.popup_inner}>

        <div className={styles.close}> 
            <button onClick={() => {props.setTrigger(false);}}>X</button>
        </div>
        
        <div className={styles.title}>
          <h1>Choose your gamestyle :</h1>
        </div>
        <div className={styles.popupfooter}>
          <button onClick={() => {props.setTrigger(false);}} id="OfflineBtn">Locally (No Saving)</button>
          <button onClick={() => {props.setTrigger(false);}} id="OnlineBtn">Online (Saving)</button>
        </div>
      </div>
    </div>
  ) : "";
}