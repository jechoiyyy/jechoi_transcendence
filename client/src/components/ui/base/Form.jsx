import React from 'react';

const Form = ({ onSubmit, children, className = '' }) => {
    return (
        <form onSubmit={onSubmit} className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${className}`}>
            {children}
        </form>
    );
};

export default Form;