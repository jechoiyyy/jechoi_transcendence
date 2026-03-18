import { useEffect, useState } from "react";

export default function useChatMessages(socket, maxMessages = 100) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!socket) return;
        
        const onMessage = (message) => {
            setMessages((prev) => {
                const next = [...prev, message];
                return next.slice(-maxMessages);
            });
        };

        socket.on("chat message", onMessage);

        return () => {
            socket.off("chat message", onMessage);
        };
    }, [socket, maxMessages]);

    return { messages, setMessages };
}
