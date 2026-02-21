export async function fetchEvents() {
    const response = await fetch(
        `http://localhost:5000/api/events`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar evento");
    }

    return response.json();
}

export async function fetchEventUsers(userId) {
    const response = await fetch(
        `http://localhost:5000/api/events/${userId}/users`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
    }

    return response.json();
}

export async function fetchEventUsersArrowStatus(eventId, userId) {
    const response = await fetch(
        `http://localhost:5000/api/events/${eventId}/users/${userId}`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar evento");
    }

    return response.json();

}

export async function flecharUser(fromUser, toUser, eventId) {
    const response = await fetch(`http://localhost:5000/api/events/${eventId}/interaction`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fromUser,
            toUser,
        }),

    });

    if (!response.ok) {
        throw new Error("Erro ao flechar usuário");
    }

    return response.json();
}





