import React from 'react';

const GameMessage = ({ children, className = "", variant = "default" }) => {
    const variants = {
        default: "bg-purple-100/50 border-purple-200/50 hover:bg-purple-100 text-gray-800",
        glass: "bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 text-white",
        dark: "bg-black/40 border-white/20 hover:bg-black/50 text-white",
    };
    
    return (
        <div className={`rounded-lg p-3 border transition-all duration-200 shadow-sm ${variants[variant] || variants.default} ${className}`}>
            {children}
        </div>
    );
}

export default GameMessage;