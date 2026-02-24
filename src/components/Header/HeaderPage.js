"use client";

import styles from "./HeaderPage.module.css";
import { useRouter } from "next/navigation"; 



export default function HeaderPage({ photo, userRef }) {
const router = useRouter();

  return (
  <header className={styles.header}>
      <button className={styles.logo} onClick={() => router.push(`http://localhost:3000/event`)}>NITTIO</button>
      <div></div>
      <div className={styles.userProfile} ref={userRef}>
        <img src={photo} alt="User" />
      </div>
    </header> );
}