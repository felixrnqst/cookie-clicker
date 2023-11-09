/*
popup.js - Created by Guillaume
This create the inital popup for the user to choose saving his progress or not
*/
import React, { useState, useEffect } from "react";
import styles from './popup.module.scss';
import Account from './account'

export default function Popup(props) {

  useEffect(() => {
    if(localStorage.getItem('mode') !== null){
      console.log("Hiding popup")
      props.setTrigger(false);
      if(localStorage.getItem('mode') == 'online' && localStorage.getItem('code') === null){
        console.log("Showing account popup")
        props.setAccountPopup(true);
      }
    }else{
      console.log("Showing popup")

      props.setTrigger(true)
    }
  }, [])

  function localClick(){
    console.log('Local')
    props.setTrigger(false);
    props.setAccountPopup(false);
    localStorage.setItem('mode', 'local')
  }

  function saveClick(){
    console.log('Online')
    props.setTrigger(false);
    props.setAccountPopup(true);
    localStorage.setItem('mode', 'online')
  }

  return props.trigger ? (
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
  ) : (
    <Account accountPopup={props.accountPopup} setAccountPopup={props.setAccountPopup} cookies={props.cookies} setCookies={props.setCookies} userCode={props.userCode} setUserCode={props.setUserCode} storeState={props.storeState} setStoreState={props.setStoreState} randomCode={props.randomCode} reset={props.reset}/>
  );
}
