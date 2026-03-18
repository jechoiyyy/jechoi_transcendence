import React from 'react';
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";

function Pager({ page, lastPage, onPrev, onNext, size = "md" }) {
    const cls = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";
    const iconSize = size === "sm" ? 16 : 18;
    
    return (
        <div className="flex items-center gap-2">
            <button
                className={`rounded-full bg-white text-purple-500 hover:bg-purple-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-sm hover:shadow-md ${cls}`}
                onClick={() => { if (page > 1) onPrev(); }}
                disabled={page <= 1}
                aria-label="Previous page"
            >
                <RiArrowLeftSFill size={iconSize} />
            </button>
            <div className={`px-3 py-1 rounded-full bg-white text-gray-700 font-medium ${size === "sm" ? "text-xs" : "text-sm"}`}>
                {page} / {lastPage}
            </div>
            <button
                className={`rounded-full bg-white text-purple-500 hover:bg-purple-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-sm hover:shadow-md ${cls}`}
                onClick={() => { if (page < lastPage) onNext(); }}
                disabled={page >= lastPage}
                aria-label="Next page"
            >
                <RiArrowRightSFill size={iconSize} />
            </button>
        </div>
    );
}

export default Pager;