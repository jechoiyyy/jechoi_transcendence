import { useEffect } from "react";

export default function useMoveSocket({ user, socket, type, roomId = null }) {
  useEffect(() => {
    if (!socket || !user) return;

    const onConnect = () => {
      socket.emit("move", { type, roomId });
    };

    if (socket.connected) {
      onConnect();
    } else {
      socket.once("connect", onConnect);
    }

    return () => {
      socket.off("connect", onConnect);
    };
  }, [user, socket, type, roomId]);
}
