"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { fetchEvents, fetchUsers } from "../../services/api"; 
import HeaderPage from "../../components/Header/HeaderPage";
import Hero from "../../components/Hero/Hero"
import styles from "./event.module.css";


  const user = await fetchUsers();
  const fromUser = user[0]._id;
const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  

  

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    };
    loadEvents();
  }, []);

  return (
    <div className={styles.pageContainer}>

      <HeaderPage
          photo={user[0].photo}
          />

      <Hero
      title="Descubra os Próximos Eventos"
      subtitle="Veja todos os eventos disponíveis e participe das experiências que mais combinam com você!"
      />

        <div className={styles.grid}>
          {events.map((event) => (
            <div key={event._id} className={styles.card}>
              <div>
                <h2 className={styles.cardTitle}>{event.name}</h2>
                <p className={styles.cardDescription}>{event.description}</p>
              </div>
              <button
                className={styles.button}
                onClick={() => router.push(`/${fromUser}/${event._id}/userEvent`)}
              >
                Entrar
              </button>
            </div>
          ))}
        </div>

    </div>
  );
};

export default EventsPage;