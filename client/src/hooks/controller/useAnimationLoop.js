import { useEffect, useRef } from 'react';

export default function useAnimationLoop(callback) {
	const cb = useRef(callback);
	cb.current = callback;

	useEffect(() => {
		let frame;

		const loop = () => {
			cb.current();
			frame = requestAnimationFrame(loop);
		};
		
		loop();
		return () => cancelAnimationFrame(frame);
	}, []);
}
