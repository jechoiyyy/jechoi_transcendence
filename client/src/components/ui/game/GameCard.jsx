import React from 'react';

const GameCard = ({ children, className = "", variant = "default" }) => {
    const variants = {
        default: "bg-white/80 backdrop-blur-md border border-gray-100",
        glass: "bg-black/40 backdrop-blur-lg border border-white/10",
        dark: "bg-black/60 backdrop-blur-md border border-white/20",
    };
    
    return (
        <div className={`p-6 rounded-xl shadow-2xl ${variants[variant] || variants.default} ${className}`}>
            {children}
        </div>
    );
}

export default GameCard;