import { useState, useEffect, useRef } from 'react';

export default function useGetOnlineUsers(socket, locationKey) {
    const [online, setOnlineUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [getEmit, setGetEmit] = useState(false);

    const intervalRef = useRef(null);
    const getEmitRef = useRef(getEmit);
    const socketRef = useRef(socket);

    useEffect(() => { socketRef.current = socket }, [socket]);
    useEffect(() => { getEmitRef.current = getEmit }, [getEmit]);

    const startOnlineUsersInterval = () => {
        if (intervalRef.current) return;

        intervalRef.current = setInterval(() => {
            if (socketRef.current?.connected) {
                socketRef.current.emit('onlineUsers');
            }
        }, getEmitRef.current ? 30_000 : 2_000);
    };

    const stopOnlineUsersInterval = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    useEffect(() => {
        stopOnlineUsersInterval();
        startOnlineUsersInterval();
    }, [getEmit]);

    useEffect(() => {
        if (!socket) return;

        const handleOnlineUsers = (users) => {
            setGetEmit(true);
            setOnlineUsers(users || []);
            setLoading(false);
        };

        const setup = () => {
            setLoading(true);
            socket.on("onlineUsers", handleOnlineUsers);
            socket.emit('onlineUsers');
            startOnlineUsersInterval();
        };

        if (socket.connected) setup();
        else socket.once("connect", setup);

        return () => {
            socket.off("onlineUsers", handleOnlineUsers);
            stopOnlineUsersInterval();
        };
    }, [socket, locationKey]);

    return { online, loading };
}
