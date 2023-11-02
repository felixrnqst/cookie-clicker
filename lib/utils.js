/*
utils.js - Created by Guillaume
This group usefuls functions and functions to interact with supabase DB
*/

import supabase from "supabase";

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
      return false;
    } else {
      console.log(`Succesfully added user_code ${code} to DB !`);
      return true;
    }
}
