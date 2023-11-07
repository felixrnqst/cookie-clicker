/*
popup.js - Created by Guillaume
This create the inital popup for the user to choose saving his progress or not
*/
import React, { useState, useEffect } from "react";
import styles from './popup.module.scss';
import Account from './account'


// The close button is temporary for development
export default function Popup(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [showAccountPopup, setShowAccountPopup] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('mode') !== null){
      setShowPopup(false);
      if(localStorage.getItem('mode') == 'online'){
        setShowAccountPopup(true);
      }
    }else{
      setShowPopup(true)
    }
  }, [])

  function localClick(){
    setShowPopup(false);
    localStorage.setItem('mode', 'local')
  }

  function saveClick(){
    setShowPopup(false);
    setShowAccountPopup(true);
    localStorage.setItem('mode', 'online')
  }

  return showPopup ? (
    <div className={styles.popup}>
      <div className={styles.popup_inner}>
        <div className={styles.title}>
          <h1>Choose your gamestyle :</h1>
        </div>
        <div className={styles.popupfooter}>
          <button onClick={localClick}>Local (No backup)</button>
          <button onClick={saveClick}>Online</button>
        </div>
      </div>
    </div>
  ) : showAccountPopup ? (
    <Account setTrigger={setShowAccountPopup} cookies={props.cookies} setCookies={props.setCookies} userCode={props.userCode} setUserCode={props.setUserCode} storeState={props.storeState} setStoreState={props.setStoreState} randomCode={props.randomCode}/>
  ) : "";
}
