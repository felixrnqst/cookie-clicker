/*
header.js - Created by Felix
The header component will display the current user
*/
import styles from './header.module.scss';
export default function Header(props){
  return (<div className={styles.header}>Your code : {props.userCode}</div>)

}
