import React from 'react';

const Button = ({ children, className = "", variant = "primary", ...props }) => {
    const base = "px-4 py-2 rounded-md font-semibold transition-colors focus:outline-none";
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-500",
        ghost: "bg-transparent flex items-center gap-2",
        danger: "bg-red-600 text-white hover:bg-red-500",
    };
    return (
        <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
            {children}
        </button>
    );
}

export default Button;