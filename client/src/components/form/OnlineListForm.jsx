import React, { useState } from 'react';

import { FaListUl } from "react-icons/fa";

import { useLocation } from 'react-router-dom';

import useAutoConnect from '@hooks/socket/useAutoConnect'
import useGetOnlineUsers from '@hooks/socket/useGetOnlineUsers';

import Pager from '@ui/base/Pager';

function OnlineListForm({ title = "Online Player List", pageSize = 6 }) {
    const { socket } = useAutoConnect();
    const [ page, setPage ] = useState(1);
    const location = useLocation();
    const { online, loading } = useGetOnlineUsers(socket, location.key);

    const lastPage = Math.max(1, Math.ceil((online.length || 0) / pageSize));
    const visibleUsers = online.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="bg-white/80 backdrop-blur-md p-3 rounded-xl">
            <div className="flex items-center justify-between mb-2">
                <div className="text-lg flex font-semibold p-2">
                    <div className="pt-1 pr-2">
                        {<FaListUl size={20} />}
                    </div>
                    <div>
                        {title}
                    </div>
                </div>
                {online.length > pageSize && (
                    <Pager 
                        page={page} 
                        lastPage={lastPage} 
                        onPrev={() => setPage(p => Math.max(1, p - 1))} 
                        onNext={() => setPage(p => Math.min(lastPage, p + 1))} 
                        size="sm" 
                    />
                )}
            </div>
            <div className="grid grid-cols-3 gap-2">
                {visibleUsers.length === 0 ? (
                    <div className="col-span-3 text-sm text-gray-500 text-center py-4">
                        {loading ? "불러오는 중..." : "접속한 사용자가 없습니다."}
                    </div>
                ) : (
                    visibleUsers.map((user) => (
                        <div 
                            key={user.socketId} 
                            className="bg-slate-50 border-l-4 border-slate-800 rounded-r-md p-2 text-center shadow-sm hover:bg-slate-100 hover:border-slate-600 transition-all"
                        >
                            <div className="font-semibold text-slate-900">
                                {user.nickname}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default OnlineListForm;