/*
utils.js - Created by Guillaume
This group usefuls functions and functions to interact with supabase DB
*/

import supabase from "supabase";

export function handlePageClose(storeState, code) {
    // TODO : ADD WORKING LISTENER ! This one looks like very unstable and depends on user's browser
    // Works when refresh page but not when page was closed by user.
    window.addEventListener('beforeunload', async function(event) {
      await savePlayerProgress(storeState, code)
    });
  }


export async function savePlayerProgress(storeState, code) {
    if (code != "") {
    const { error } = await supabase
    .from('cookie')
    .update({ "cookies" : window.cookies,
              "upgrades" : 
              { 
                "Autoclick" : storeState.Autoclick,
                "Multiplier" : storeState.Multiplier,
                "Bakery" : storeState.Bakery,
  
              }
          })
    .eq('code', code)

    }
  }

export async function addNewPlayerToDB(code, storeState) {
  const upgradeDictAtZeroValue = Object.keys(storeState).reduce((acc, cle) => {
    acc[cle] = 0;
    return acc;
  }, {});
  const { error } = await supabase
  .from('cookie')
  .insert({ "code" : code,
            "cookies" : 0,
            "upgrades" : 
            upgradeDictAtZeroValue
        })
    if (error) {
      console.log(error)
    } else {
      console.log(`Succesfully added user_code ${code} to DB !`);
    }
}

