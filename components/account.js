/*
account.js - Created by Guillaume
This creates the popup for the user either to create new account or enter their account information
*/
import { useState, useEffect, useRef } from "react";
import styles from './popup.module.scss'; //Uses the same styles as for the pop-up
import {handlePageClose, savePlayerProgress } from "../lib/utils"

export default function Account ({setTrigger, storeState, setStoreState, setUserCode, setCookies, randomCode}) {
  const [showAccount, setShowAccount] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const codeRef = useRef();
  const saveInterval = useRef();
  // TODO Find better way to save and sync data with the DB
  const save_delay = 2; // Save user data to DB every x seconds

  useEffect(() => {
    return () => {//Cleanup function
      clearInterval(saveInterval.current);
    }
  })


  function retreive_account_data(data) {
    setShowAccount(false);
    console.log(data)
    window.cookies = data.cookies
    setCookies(data.cookies)
    localStorage.setItem("cookies", data.cookies);
    // Recover all upgrade of user
    for (let upgrade_name in storeState) {
      setStoreState(s => {
        s[upgrade_name] = data.upgrades[upgrade_name];
        return s})
    }
  }

  async function startNewSavedGame() {
    console.log(`Adding user_code ${randomCode} to DB...`);
    var res = await fetch('/api/add-player', {
      method: 'POST',
      body: JSON.stringify({randomCode, storeState})
    })
    console.log('HTTP status: ' + res.status);
    setUserCode(randomCode);
    setCookies(0);
    setInterval(() => {
      savePlayerProgress(storeState, randomCode);
    }, save_delay * 1000); // save_delay in seconds
    localStorage.setItem('code', randomCode)

    setShowAccount(false);
    // Listener to save user data when they leave the website
    handlePageClose(storeState, randomCode)
  }

  async function login(code) {
    console.log(code);
    if (!code) {
      setErrorMessage("Please enter a valid code!");
      return;
    }

    try {
      console.log("Fetching")
      setErrorMessage("")
      setLoading(true);
      var res = await fetch('/api/retrieve-data', {
        method: 'POST',
        body: JSON.stringify({code})
      })
      console.log(res.status);
      var json = await res.json();
      if(res.status == 200){
        console.log(json.data)
        const isValidCode = !!json.data;
        if (isValidCode) {
          // Listener to save user data when they leave the website
          handlePageClose(storeState, code)
          setUserCode(code)
          setSuccess(isValidCode);
          saveInterval.current = setInterval(() => {
            savePlayerProgress(storeState, code);
          }, save_delay * 1000); // save_delay in seconds
          retreive_account_data(json.data, storeState)
        }else{
          console.log("Code isn't valid!")
        }
      }else{
        setErrorMessage(json.error);
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
          <button onClick={() => { setTrigger(false); }}>X</button>
        </div>

        <div className={styles.popupfooter}></div>

        <div className={styles.float_container}>
          <div className={styles.float_child}>
            <div className={styles.title}>
              <h2>Start a new game :</h2>
            </div>
            <h3>Your code :</h3>
            <h4>( Note it for later ! )</h4>
            <h2>{randomCode}</h2>
            <button onClick={() => startNewSavedGame(storeState)}>Start</button>
          </div>

          <div className={styles.float_child}>
            <div className={styles.title}>
              <h2>Restart from your progress :</h2>
            </div>
            <h3>Session Code : {<br/>}(0 is the basic one)</h3>
            <input
              ref={codeRef}
              className={styles.code_input}
              placeholder="Session Code"
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  login(event.target.value.toString());
                }
              }}
            />
            <button onClick={() => login(codeRef.current.value.toString())}>Retrieve</button>
            {loading && <p>Loading...</p>}
            {!success && <p>{errorMessage}</p>}
            {success && <p>Code is valid!</p>}
          </div>
        </div>
      </div>
    </div>
  ) : "";
};
