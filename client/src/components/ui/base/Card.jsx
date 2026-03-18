import React from 'react';

const Card = ({ children, className = "" }) => {
    return (
        <div className={`bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md border border-gray-100 ${className}`}>
            {children}
        </div>
    );
}

export default Card;