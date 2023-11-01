/*
utils.js - Created by Guillaume
This group usefuls functions and functions to interact with supabase DB
*/

import supabase from "supabase";

export function handlePageClose(storeState, code) {
    // TODO : ADD ALSO LISTENER WHEN PAGE CLOSE
    // Works when refresh page but not when page was closed by user.
    window.addEventListener('beforeunload', async function(event) {
      await savePlayerProgress(storeState, code)
    });
  }


export async function savePlayerProgress(storeState, code) {
    console.log(storeState)
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

export async function addNewPlayerToDB(code) {
  const { error } = await supabase
  .from('cookie')
  .insert({ "code" : code,
            "cookies" : 0,
            "upgrades" : 
            { 
              "Autoclick" : 0,
              "Multiplier" : 0,
              "Bakery" : 0,

            }
        })
    if (error) {
      console.log(error)
    } else {
      console.log(`Succesfully added user_code ${code} to DB !`);
    }
}
