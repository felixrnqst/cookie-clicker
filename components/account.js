/*
account.js - Created by Guillaume
This create the popup for the user either to create new account or enter his account informations
*/
import React, { useState, useEffect } from "react";
import styles from './account.module.scss';
import supabase from "supabase";
import { addNewPlayerToDB } from "./utils";
import { customAlphabet } from 'nanoid';
import { handlePageClose } from "../components/utils"

import { ActualStoreState } from "./store";
import { setCookies } from "../pages/index"

const alphabet = '0123456789';
const nanoid = customAlphabet(alphabet, 6);
const random_code = parseInt(nanoid());


export default function Acccount (props) {
  const [showAccount, setShowAccount] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userCode, setUserCode] = useState('');



  function retreive_account_data(data) {
    setShowAccount(false);
    console.log(data)
    window.cookies = data.cookies
    localStorage.setItem("cookies", data.cookies);
    
    
  }

  function startNewSavedGame() {
    console.log(`Adding user_code ${random_code} to DB...`);
    addNewPlayerToDB(random_code);
    setUserCode(random_code)
    // TODO SET COOKIES TO 0 (using setCookies(0) from index.js i suppose but I can't make it working...)
    setShowAccount(false);

    // Listener to save user data when he leaves the website
    handlePageClose(ActualStoreState, random_code)
  }

  async function login(code) {
    console.log(code);
    if (!code) {
      setErrorMessage("Please enter a valid code!");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cookie')
        .select(`code, cookies, upgrades`)
        .eq("code", code)
        .single();
      if (error) {
        setErrorMessage("Wrong Code !");
        console.log(error);
      } else {

      const isValidCode = !!data;
      if (isValidCode) {
        // Listener to save user data when he leaves the website
        handlePageClose(ActualStoreState, code)
        setUserCode(code)
        setSuccess(isValidCode);
        retreive_account_data(data)
      }
      
      }
    } catch (error) {
      setErrorMessage("Wrong Code !");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return showAccount ? (
    <div className={styles.account_popup}>
      <div className={styles.account_popup_inner}>
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
            <button onClick={() => { startNewSavedGame() }}>Start</button>
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
          </div>
        </div>
        {loading && <p>Loading...</p>}
        {!success && <p>{errorMessage}</p>}
        {success && <p>Code is valid!</p>}
      </div>
    </div>
  ) : "";
};

