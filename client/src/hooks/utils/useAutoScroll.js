import { useRef, useState, useEffect } from "react";

export default function useAutoScroll(delay = 2000, messages) {
    const messagesEndRef = useRef(null);
	const containerRef = useRef(null);
    const scrollTimeoutRef = useRef(null);
    const [isUserScrolling, setIsUserScrolling] = useState(false);

    const handleWheel = () => {
        setIsUserScrolling(true);

        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
            setIsUserScrolling(false);
            if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
        }, delay);
    };

    useEffect(() => {
        if (!isUserScrolling && containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    return {
        messagesEndRef,
		containerRef,
        handleWheel,
        isUserScrolling,
        setIsUserScrolling,
    };
}
