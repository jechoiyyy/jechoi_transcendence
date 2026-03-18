import { useEffect, useState } from "react";

export default function useTimer(delay = 600, onTimerEnd = null){
	const [timer, setTimer] = useState(delay);

	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => {
				setTimer(prev => prev - 1);
			}, 1000);
			return () => clearInterval(interval);
		} else {
			if (onTimerEnd && typeof onTimerEnd === 'function') {
				onTimerEnd();
			}
		}
	}, [timer]);

	const resetTimer = async () => {
        setTimer(delay);
    };
  
	return { timer, resetTimer };
};

