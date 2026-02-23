"use client";

import { useEffect, useState } from "react";
import { fetchEventUsersArrowStatus, fetchEvents, fetchEventUsers } from "../services/api";

const events = await fetchEvents();
const eventId = events[0]._id;

const user = await fetchEventUsers(eventId);
const userId = user[0]._id;;

export function useEventUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadUsers() {
        try {
            const data = await fetchEventUsersArrowStatus(eventId, userId);
            setUsers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    
    return { users, loading, reload: loadUsers };
}