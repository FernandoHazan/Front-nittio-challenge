"use client";

import styles from "./event.module.css";

import { useEventUsers } from "../../hooks/useEventUsers";
import UserCard from "../../components/UserCard";
import { flecharUser, fetchEvents, fetchEventUsers } from "../../services/api";

const events = await fetchEvents();
const eventId = events[0]._id;

const user = await fetchEventUsers(eventId);
const fromUser = user[0]._id;

export default function EventPage() {
    const { users, loading, reload } = useEventUsers();

    async function handleFlechar(toUser) {
        try {
            await flecharUser(fromUser, toUser, eventId);
            reload();
        } catch (error) {
            console.error(error);
        }
    }

    if (loading) return <p className={styles.loading}>Carregando...</p>;

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.title}>Pessoas no Evento</h1>

            <div className={styles.grid}>
                {users.map((user) => (
                    <UserCard
                        key={user._id}
                        user={user}
                        onFlechar={() => handleFlechar(user._id)}
                    />
                ))}
            </div>
        </div>
    );
}