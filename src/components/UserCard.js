"use client";

import styles from "./UserCard.module.css";
import { useRef } from "react";

export default function UserCard({ user, onFlechar }) {
  const imageRef = useRef(null);

  return (
    <div className={styles.card}>     
      <img
        ref={imageRef}
        src={user.photo}
        alt={user.name}
        className={styles.image}
      />

      <div className={styles.content}>
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.description}>{user.description}</p>
        <p className={styles.age}>{user.age} anos</p>
      </div>

      <button
        onClick={() => onFlechar(imageRef)}
        disabled={user.alreadyArrowed}
        className={`${styles.button} ${
          user.alreadyArrowed
            ? styles.buttonDisabled
            : styles.buttonActive
        }`}
      >
        {user.alreadyArrowed ? "Já flechado" : "Flechar"}
      </button>
    </div>
  );
}