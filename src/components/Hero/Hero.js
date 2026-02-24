"use client";

import styles from "./Hero.module.css";

export default function Hero({ title, subtitle }) {
  return (    
    <section className={styles.hero}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </section> 
  );
}