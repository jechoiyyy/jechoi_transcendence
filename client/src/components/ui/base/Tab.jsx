import React from 'react';

const Tab = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="tabs">
            <ul className="flex border-b">
                {tabs.map((tab, index) => (
                    <li key={index} className={`mr-1 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}>
                        <button
                            className="py-2 px-4 text-sm font-medium text-gray-600 hover:text-blue-500 focus:outline-none"
                            onClick={() => onTabChange(tab)}
                        >
                            {tab}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tab;