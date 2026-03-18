import { io } from "socket.io-client";

let socket = null;
let heartbeatTimer = null;

const SOCKET_URL = `${window.location.protocol}//${window.location.hostname}:3000`;

export function connectSocket() {
	if (socket) return socket;

	socket = io(SOCKET_URL, {
		withCredentials: true,
		transports: ["websocket"],
	});

	socket.on('connect', () => {
		startHeartbeat();
		socket.emit('heartbeat');
	});

	socket.on('disconnect', stopHeartbeat);

	return socket;
}

export function getSocket() {
	return socket && socket.connected ? socket : null;
}

export function disconnectSocket() {
	if (!socket || !socket.connected) return;

	socket.disconnect();
	socket = null;
}

function startHeartbeat() {
	if (heartbeatTimer) return;

	heartbeatTimer = setInterval(() => {
		if (socket?.connected) {
			socket.emit('heartbeat');
		}
	}, 30_000);
}

function stopHeartbeat() {
	if (!heartbeatTimer) return;

	clearInterval(heartbeatTimer);
	heartbeatTimer = null;
}