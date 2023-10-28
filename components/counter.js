/*
counter.js - Created by Felix
This formats the cookie value
*/
export default function Counter({cookies}){

  return <h3>{cookies} {cookies != 1 ? 'cookies' : 'cookie'}</h3>
}
