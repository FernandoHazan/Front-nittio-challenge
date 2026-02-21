"use client";

import styles from "./UserCard.module.css";

export default function UserCard({ user, onFlechar }) {
    return (
        <div className={styles.card}>
            <img src={user.photo} alt={user.name} className={styles.image} />

            <div className={styles.content}>
                <h2 className={styles.name}>{user.name}</h2>
                <p className={styles.description}>{user.description}</p>
                <p className={styles.age}>{user.age} anos</p>
            </div>

            <button
                onClick={onFlechar}
                disabled={user.alreadyArrowed}
                className={`${styles.button} ${user.alreadyArrowed
                        ? styles.buttonDisabled
                        : styles.buttonActive
                    }`}
            >
                {user.alreadyArrowed ? "Já flechado" : "Flechar"}
            </button>
        </div>
    );
}