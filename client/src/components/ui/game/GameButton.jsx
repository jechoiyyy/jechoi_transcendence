import React from 'react';

const GameButton = ({ children, className = "", variant = "primary", ...props }) => {
    const base = "font-semibold rounded-lg transition-all duration-300 focus:outline-none";
    const variants = {
        primary: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg hover:scale-105 px-6 py-3",
        ghost: "bg-transparent text-white/90 hover:text-white hover:bg-white/10 px-4 py-2",
        glass: "bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2",
        secondary: "bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 border border-white/10 px-4 py-2",
        soft: "bg-gray-900/80 text-white border border-white/20 backdrop-blur-sm hover:bg-gray-900 transition-colors",
    };
    return (
        <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
            {children}
        </button>
    );
}

export default GameButton;