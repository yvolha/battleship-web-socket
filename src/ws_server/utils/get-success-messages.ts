export const getUserRegisteredMessage = (id: number, name: string) =>
    `User with ID "${id}" and name "${name}" registered successfully.`;

export const getRoomCreatedMessage = (id: number, name: string) =>
    `Game room with ID "${id}" created and user "${name}" added to it.`;

export const getGameCreatedMessage = (id: number) => `Game with ID "${id}" created.`;