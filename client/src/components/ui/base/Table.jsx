import React from 'react';

const Table = ({ data, columns }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        {columns.map((column, index) => (
                            <th key={index} className="py-2 px-4 border-b text-left text-gray-600 font-semibold">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-100">
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className="py-2 px-4 border-b text-gray-800">
                                    {row[column]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;