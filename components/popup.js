/*
popup.js - Created by Guillaume
This create the inital popup for the user to choose saving his progress or not
*/
import React, { useState } from "react";
import styles from './popup.module.scss';
import Account from './account'


// The close button is temporary for development
export default function Popup(props) {
  const [showPopup, setShowPopup] = useState(true);
  const [showAccountPopup, setShowAccountPopup] = useState(false);

  function localClick(){
    setShowPopup(false);
  }

  function saveClick(){
    setShowPopup(false);
    setShowAccountPopup(true);
  }

  return showPopup ? (
    <div className={styles.popup}>
      <div className={styles.popup_inner}>
        <div className={styles.close}>
          <button onClick={() => {props.setTrigger(false);}}>X</button>
        </div>
        <div className={styles.title}>
          <h1>Choose your gamestyle :</h1>
        </div>
        <div className={styles.popupfooter}>
          <button onClick={localClick}>Locally (No Saving)</button>
          <button onClick={saveClick}>Online (Saving)</button>
        </div>
      </div>
    </div>
  ) : showAccountPopup ? (
    <Account setTrigger={setShowAccountPopup} cookies={props.cookies} setCookies={props.setCookies} userCode={props.userCode} setUserCode={props.setUserCode} storeState={props.storeState} setStoreState={props.setStoreState} randomCode={props.randomCode}/>
  ) : "";
}
