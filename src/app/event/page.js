"use client";

import styles from "./event.module.css";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { useEventUsers } from "../../hooks/useEventUsers";
import UserCard from "../../components/UserCard";
import { flecharUser, fetchEvents, fetchEventUsers } from "../../services/api";

const events = await fetchEvents();
const eventId = events[0]._id;

const user = await fetchEventUsers(eventId);
const fromUser = user[0]._id;

export default function EventPage() {
    const { users, loading, reload } = useEventUsers();
    
    const headerUserRef = useRef(null);
    const [arrowData, setArrowData] = useState(null);
    const [impactedUserId, setImpactedUserId] = useState(null);

async function handleFlechar(toUser, targetRef) {
  try {
    const start = headerUserRef.current.getBoundingClientRect();
    const end = targetRef.current.getBoundingClientRect();

    const impactX = end.left + end.width / 2;
    const impactY = end.top + end.height / 2;

    setArrowData({
      startX: start.left + start.width / 2,
      startY: start.top + start.height / 2,
      endX: impactX,
      endY: impactY,
    });

    // 💘 EXPLOSÃO DE CORAÇÕES
    createHearts(impactX, impactY);

    // 🔁 Remove impacto depois
    setTimeout(() => {
      setImpactedUserId(null);
    }, 600);

    // 🔥 chamada backend
    await flecharUser(fromUser, toUser, eventId);

    reload();
  } catch (error) {
    console.error(error);
  }
}

function createHearts(x, y) {
  const total = 8;

  for (let i = 0; i < total; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";

    const angle = Math.random() * 2 * Math.PI;
    const distance = 60 + Math.random() * 40;

    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;

    heart.style.position = "fixed";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.fontSize = 20 + Math.random() * 10 + "px";
    heart.style.zIndex = 9999;
    heart.style.pointerEvents = "none";
    heart.style.transition = "all 0.8s cubic-bezier(.17,.67,.83,.67)";
    heart.style.opacity = "1";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.4)`;
      heart.style.opacity = "0";
    }, 10);

    setTimeout(() => heart.remove(), 800);
  }
}
    

    if (loading) return <p className={styles.loading}>Carregando...</p>;

        return (
  <div className={styles.pageContainer}>
    
    <header className={styles.header}>
      <div className={styles.logo}>NITTIO</div>
      <div></div>
      <div className={styles.userProfile} ref={headerUserRef}>
        <img src={user[0].photo} alt="User" />
      </div>
    </header>

    <section className={styles.hero}>
      <h1 className={styles.title}>Pessoas no Evento</h1>
      <p className={styles.subtitle}>
        Explore e conecte-se com participantes deste evento
      </p>
    </section>

    <div className={styles.grid}>
      {users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          impacted={user._id === impactedUserId}
          onFlechar={(imageRef) =>
    handleFlechar(user._id, imageRef)
  }
        />
      ))}
    </div>
{arrowData && (
  <motion.img
    src="./arrowAnimate.png"
    alt="arrow"
    initial={{
      top: (arrowData.startY - 60),
      left: (arrowData.startX - 60),
      width: 100,
      height: 100,
      rotate: -45,
      opacity: 0.5,
    }}
    animate={{
      top: arrowData.endY,
      left: arrowData.endX,
       width: 200,
      height: 200,
      rotate: 0,
      opacity: 1,
    }}
    transition={{
      duration: 1.5,
      ease: "easeInOut",
    }}
    onAnimationComplete={() => {
      const { endX, endY } = arrowData;

      setArrowData(null);
      createHearts(endX, endY);
    }}
    style={{
      position: "fixed",
      width: 200,
      height: 200,
      zIndex: 9999,
      pointerEvents: "none",
      transform: "translate(-50%, -50%)",
    }}
  />
)}
  </div>
  
);
    
}