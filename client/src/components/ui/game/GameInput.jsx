import React from "react";

const GameInput = ({ label, error, className = "", variant = "default", ...props }) => {
    const variants = {
        default: "bg-white border-gray-200 text-gray-800 focus:border-indigo-500 focus:ring-indigo-300",
        glass: "bg-white/5 backdrop-blur-sm text-white placeholder-white/40 border-white/10 focus:border-purple-400/50 focus:ring-purple-400/20",
        chat: "bg-white/80 text-gray-800 placeholder-gray-400 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20",
    };
    
    return (
        <label className={`flex flex-col text-sm ${className}`}>
            {label && <span className={`mb-1 font-font-semibold ${variant === 'glass' ? 'text-white/90' : 'text-gray-700'}`}>{label}</span>}
            <input
                className={`px-4 py-3 border rounded-lg font-semibold focus:ring-2 focus:outline-none transition-all ${
                    error ? "border-red-400" : ""
                } ${variants[variant] || variants.default}`}
                {...props}
            />
            {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </label>
    );
}

export default GameInput;