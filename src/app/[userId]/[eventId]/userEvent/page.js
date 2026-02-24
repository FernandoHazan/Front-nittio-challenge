"use client";

import styles from "./userEvent.module.css";

import { useRef, useState } from "react";
import { use } from "react";

import { useEventUsers } from "../../../../hooks/useEventUsers";
import { flecharUser, fetchEventUsers, fetchEvents } from "../../../../services/api";

import UserCard from "../../../../components/UserCard/UserCard";
import HeaderPage from "../../../../components/Header/HeaderPage"
import Hero from "../../../../components/Hero/Hero"
import ArrowAnimation from "../../../../components/ArrowAnimation/ArrowAnimation";
import Hearts from "../../../../components/Hearts/Hearts";

const events = await fetchEvents();
const eventIdLogin = events[0]._id;

const user = await fetchEventUsers(eventIdLogin);


export default function UserEventPage({ params }) {
  const { userId, eventId } = use(params);
  const fromUser = userId;

    const { users, loading, reload } = useEventUsers( eventId, userId);

    const headerUserRef = useRef(null);
    const [arrowData, setArrowData] = useState(null);
    const [heartsData, setHeartsData] = useState(null);

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
    setHeartsData({ x: impactX, y: impactY });

    // 🔥 chamada backend
    console.log(fromUser, eventId)
    await flecharUser(fromUser, toUser, eventId);

    reload();
  } catch (error) {
    console.error(error);
  }
}

    if (loading) return <p className={styles.loading}>Carregando...</p>;

        return (
  <div className={styles.pageContainer}>
    
    <HeaderPage
    photo={user[0].photo}
    userRef={headerUserRef}
    />

    <Hero
          title="Pessoas no Evento"
          subtitle="Explore e conecte-se com participantes deste evento"
          />

    <div className={styles.grid}>
      {users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          onFlechar={(imageRef) =>
    handleFlechar(user._id, imageRef)
  }
        />
      ))}
    </div>

    {arrowData && (
  <ArrowAnimation
    arrowData={arrowData}
    onComplete={() => {
      setHeartsData({ x: arrowData.endX, y: arrowData.endY });
      setArrowData(null);
    }}
  />
    )}
    {heartsData && (
  <Hearts
    x={heartsData.x}
    y={heartsData.y}
    total={8}
    onComplete={() => setHeartsData(null)}
  />
    )}
  </div>
); 
}