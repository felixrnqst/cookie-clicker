/*
header.js - Created by Felix
The header component will display the current user
*/
import styles from './header.module.scss';
import Image from 'next/image'
import user from '../public/user.png'

export default function Header(props){
  return (
    <div className={styles.header}>
      <div className={styles.user} onClick={props.showPopup}>
        <div style={{height: '1.5rem', width: '1.5rem'}}>
          <Image layout='intrinsic' src={user}/>
        </div>
        <p>{props.userCode}</p>
      </div>
    </div>
  )

}
