/*
account.js - Created by Guillaume
This creates the popup for the user either to create new account or enter their account information
*/
import { useState, useEffect, useRef } from "react";
import styles from './popup.module.scss'; //Uses the same styles as for the pop-up

export default function Account ({accountPopup, setAccountPopup, storeState, setStoreState, userCode, setUserCode, cookies, setCookies, randomCode, reset}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const codeRef = useRef();
  const saveInterval = useRef();
  // TODO Find better way to save and sync data with the DB
  const save_delay = 2; // Save user data to DB every x seconds

  useEffect(() => {
    if(localStorage.getItem('code') !== null){
      setAccountPopup(false);
      login(localStorage.getItem('code'));
    }else{
      if(localStorage.getItem('mode') !== 'local')
        setAccountPopup(true);
    }
    return () => {//Cleanup function
      clearInterval(saveInterval.current);
    }
  }, [])

  useEffect(() => {
    if(codeRef.current != null && userCode != '' && userCode != 'null'){
      codeRef.current.value = userCode
    }
  }, [accountPopup])

  function localClick(){
    console.log('Switch to local')
    setAccountPopup(false);
    localStorage.setItem('mode', 'local')
    localStorage.removeItem('code')
    // Stop saving to DB
    clearInterval(saveInterval.current);
    setUserCode('')
    localStorage.removeItem("code")


    reset();

  }

  function handlePageClose(storeState, code) {
    // TODO : ADD WORKING LISTENER ! This one looks like very unstable and depends on user's browser
    // Works when refresh page but not when page was closed by user.
    window.addEventListener('beforeunload', async function(event) {
      await savePlayerProgress(code, storeState)
    });
  }

  function retreive_account_data(data) {
    setAccountPopup(false);
    setCookies(data.cookies)
    localStorage.setItem("cookies", data.cookies);
    // Recover all upgrade of user
    for (let upgrade_name in storeState) {
      setStoreState(s => {
        s[upgrade_name] = data.upgrades[upgrade_name];
        return s})
    }
  }

  async function savePlayerProgress(code, storeState){
    console.log("Saving player progress")
    if (setUserCode != "") {
      // console.log("Number of cookies to save : " + window.cookies)

      var res = await fetch('/api/save-progress', {
        method: 'POST',
        body: JSON.stringify({storeState, code, cookies: window.cookies})
      });
      // console.log(res.status)
      // var json = await res.json()
      // console.log(json);
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
    localStorage.setItem('code', randomCode);
    reset();
    saveInterval.current = setInterval(() => savePlayerProgress(randomCode, storeState), save_delay * 1000); // save_delay in seconds

    setAccountPopup(false);
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
          localStorage.setItem('mode', "online");
          localStorage.setItem('code', code);
          setUserCode(code)
          setSuccess(isValidCode);
          saveInterval.current = setInterval(() => savePlayerProgress(code, storeState), save_delay * 1000); // save_delay in seconds
          retreive_account_data(json.data, storeState)
        }else{
          console.log("Code isn't valid!")
          codeRef.current.value = code;
          setAccountPopup(true);
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

  return accountPopup ? (
    <div className={styles.popup} onClick={() => setAccountPopup(false)}>
      <div className={styles.popup_inner} onClick={(e) => e.stopPropagation()}>
        <div className={styles.close}>
          <button onClick={() => setAccountPopup(false)}>X</button>
        </div>

        <div className={styles.popupfooter}></div>

        <div className={styles.float_container}>
          {localStorage.getItem('mode') == 'online' &&
          <div className={styles.popupfooter}>
            <button onClick={localClick}>Switch to local</button>
          </div>
          }
          <div className={styles.flexContainer}>
            <div>
              <div className={styles.title}>
                <h2>Start a new game:</h2>
              </div>
              <h3>Your code :</h3>
              <h4>( Note it for later ! )</h4>
              <h2>{randomCode}</h2>
              <button onClick={() => startNewSavedGame(storeState)}>Start</button>
            </div>

            <div>
              <div className={styles.title}>
                <h2>Restart from your progress:</h2>
              </div>
              <h3>Session Code : </h3>
              <div className={styles.inputRow}>
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
              </div>
              {loading && <p>Loading...</p>}
              {!success && <p>{errorMessage}</p>}
              {success && <p>Code is valid!</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : "";
};
