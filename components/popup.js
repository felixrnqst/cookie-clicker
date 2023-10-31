/*
popup.js - Created by Guillaume
This create the inital popup for the user to choose saving his progress or not
*/
import React, { useState } from "react";
import styles from './popup.module.scss';
import Acccount from './account'


// The close button is temporary for development
export default function Popup(props) {
  const [showPopup, setShowPopup] = useState(true);
  const [showAccountPopup, setShowAccountPopup] = useState(false);

  // I don't understand why function doesn't why here
  // I must use arrow functions :/
  const SavingButtonClickEvent = () => {
    setShowPopup(false);
    setShowAccountPopup(true);
  };

  const LocallyButtonClickEvent = () => {
    setShowPopup(false);
  };

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
          <button onClick={LocallyButtonClickEvent}>Locally (No Saving)</button>
          <button onClick={SavingButtonClickEvent}>Online (Saving)</button>
        </div>
      </div>
    </div>
  ) : showAccountPopup ? (
    <Acccount setTrigger={setShowAccountPopup}/>
  ) : "";
}

