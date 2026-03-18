import React from "react";

const Input = ({ label, error, className = "", ...props }) => {
    return (
        <label className={`flex flex-col text-sm ${className}`}>
            {label && <span className="mb-1 font-semibold text-gray-700">{label}</span>}
                <input
                    className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition ${
                        error ? "border-red-400" : "border-gray-200"
                    } bg-white`}
                    {...props}
                />
            {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </label>
    );
}
export default Input;