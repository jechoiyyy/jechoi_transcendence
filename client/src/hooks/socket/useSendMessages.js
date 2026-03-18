export default function useSendMessages(user, socket, input, max_length = 200) {
    if (!user || !socket) return;
    if (!input.trim() || input.length > max_length) return;

    socket.emit("chat message", {
        message: input,
    });
}
