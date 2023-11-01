/*
account.js - Created by Guillaume
This creates the popup for the user either to create new account or enter their account information
*/
import React, { useState, useEffect } from "react";
import styles from './popup.module.scss'; //Uses the same styles as for the pop-up
import supabase from "supabase";
import { customAlphabet } from 'nanoid';
import { addNewPlayerToDB, handlePageClose, savePlayerProgress } from "./utils"

const alphabet = '0123456789';
const nanoid = customAlphabet(alphabet, 6);
const random_code = parseInt(nanoid());


export default function Account (props) {
  const [showAccount, setShowAccount] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // TODO Find better way to save and sync data with the DB
  const save_delay = 4; // Save user data to DB every 4 seconds


  function retreive_account_data(data) {
    setShowAccount(false);
    window.cookies = data.cookies
    localStorage.setItem("cookies", data.cookies);
    // Recover all upgrade of user
    for (let upgrade_name in props.storeState) {
      props.setStoreState(s => {
        s[upgrade_name] = data.upgrades[upgrade_name];
        return s})
    }


  }

  function startNewSavedGame() {
    console.log(`Adding user_code ${random_code} to DB...`);
    addNewPlayerToDB(random_code, props.storeState);
    props.setUserCode(random_code);
    props.setCookies(0);
    setInterval(() => {
      savePlayerProgress(props.storeState, random_code);
    }, save_delay * 1000); // save_delay in seconds

    setShowAccount(false);
    // Listener to save user data when he leaves the website
    handlePageClose(props.storeState, random_code)
  }

  async function login(code) {
    console.log(code);
    if (!code) {
      setErrorMessage("Please enter a valid code!");
      return;
    }

    try {
      setErrorMessage("")
      setLoading(true);
      const { data, error } = await supabase
        .from('cookie')
        .select(`code, cookies, upgrades`)
        .eq("code", code)
        .single();
      if (error) {
        if (error.message == "TypeError: NetworkError when attempting to fetch resource.") {
          setErrorMessage("Bad Internet Connection !" );
        } else {
          setErrorMessage("Wrong Code !");
          console.log(error);
      }
      } else {

      const isValidCode = !!data;
      if (isValidCode) {
        // Listener to save user data when they leave the website
        handlePageClose(props.storeState, code)
        props.setUserCode(code)
        setSuccess(isValidCode);
        setInterval(() => {
          savePlayerProgress(props.storeState, code);
        }, save_delay * 1000); // save_delay in seconds
        retreive_account_data(data, props.storeState)
      }

      }
    } catch (error) {
      if (error.message == "TypeError: NetworkError when attempting to fetch resource.") {
        setErrorMessage("Bad Internet Connection ! {<br/>}Try again");
      } else {
        setErrorMessage("Wrong Code !");
        console.log(error);
    }
    } finally {
      setLoading(false);
    }
  };

  return showAccount ? (
    <div className={styles.popup}>
      <div className={styles.popup_inner}>
        <div className={styles.close}>
          <button onClick={() => { props.setTrigger(false); }}>X</button>
        </div>

        <div className={styles.popupfooter}></div>

        <div className={styles.float_container}>
          <div className={styles.float_child}>
            <div className={styles.title}>
              <h2>Start a whole new game :</h2>
            </div>
            <h3>Your code :</h3>
            <h4>( Note it for later ! )</h4>
            <h2>{random_code}</h2>
            <button onClick={() => { startNewSavedGame(props.storeState) }}>Start</button>
          </div>

          <div className={styles.float_child}>
            <div className={styles.title}>
              <h2>Restart from your progress :</h2>
            </div>
            <h3>Session Code : {<br/>}(0 is the basic one)</h3>
            <input
              className={styles.code_input}
              placeholder="Session Code"
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  login(event.target.value.toString());
                }
              }}
            />
            {loading && <p>Loading...</p>}
            {!success && <p>{errorMessage}</p>}
            {success && <p>Code is valid!</p>}
          </div>
        </div>
      </div>
    </div>
  ) : "";
};
