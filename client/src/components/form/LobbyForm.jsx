import React, { useState } from "react";

import { BsFillHouseAddFill } from "react-icons/bs";
import { FiLock, FiUsers } from 'react-icons/fi';
import { FiRefreshCcw } from "react-icons/fi";

import { navigationRef } from "@utils/navigation";
import useGameRooms from "@hooks/game/useGameRooms";
import useEnterGame from "@hooks/game/useEnterGame"

import Card from "@ui/base/Card";
import Button from "@ui/base/Button";
import GameButton from "@ui/game/GameButton";
import Pager from "@ui/base/Pager";

export default function LobbyForm({ pageSize = 4, setIsModalOpen }) {
    const [page, setPage] = useState(1);
    const { fetchRooms, rooms, lengthRooms } = useGameRooms(page, pageSize);
    const lastPage = Math.max(1, Math.ceil(lengthRooms / pageSize));
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [passwordInput, setPasswordInput] = useState('');

	const { enterGameResult } = useEnterGame(
        () => navigationRef.navigate("/games", {
			state: { from: "home" }
		}
    ));

    const handleJoinClick = (room) => {
        if (room.hasPassword) {
            setSelectedRoom(room.roomId);
        } else {
	        enterGameResult({ roomId: room.roomId });
        }
    };

    const handlePasswordSubmit = (roomId) => {
        enterGameResult({ roomId: roomId, passwordInput });
        setSelectedRoom(null);
        setPasswordInput('');
    };

    return (
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="text-3xl">♠️</span>
                        Game Lobby
                    </h3>
                    <p className="text-sm text-gray-500 font-bold mt-1">참가할 게임 방을 선택하세요</p>
                </div>
                <GameButton 
                    onClick={() => setIsModalOpen(true)} 
                    variant='soft' 
                    className='py-4 px-6'>
                    <div className="flex items-center gap-2">
                        <BsFillHouseAddFill size={20} />Create Game
                    </div>
                </GameButton>
            </div>
            <div className="flex items-center justify-between mb-6">
                <div className="col-span-full flex justify-center">
                    <Pager 
                        page={page} 
                        lastPage={lastPage} 
                        onPrev={() => setPage(p => Math.max(1, p - 1))} 
                        onNext={() => setPage(p => Math.min(lastPage, p + 1))}
                    />
                </div>
                <Button 
                    variant='ghost' 
                    className="mb-0 pt-0 hover:scale-[1.12]"
                    onClick={()=>{
                        fetchRooms();
                        setSelectedRoom(null);
                        setPasswordInput('');
                    }}
                    >
                    <FiRefreshCcw size={22} />
                </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {rooms.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center text-center py-16">
                        <div className="text-7xl mb-4 opacity-30">🃏</div>
                        <p className="text-gray-400 text-lg font-medium">현재 방이 없습니다</p>
                        <p className="text-gray-400 text-sm mt-2">새로운 게임을 시작해보세요!</p>
                    </div>
                ) : (
                    rooms.map((r) => (
                       <Card 
                            key={r.roomId} 
                            className="group bg-white hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-purple-400 rounded-xl flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                    {r.roomName}
                                    {r.hasPassword && (
                                        <FiLock className="text-amber-500" size={18} />
                                    )}
                                </h4>
                                <span className="text-xs font-medium px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full">
                                    {r.mode}
                                </span>
                            </div>
                            <div className="p-1 mt-auto">
                                <div className="mb-2 border-b border-gray-100">
                                    <div className="flex items-center justify-between text-sm text-gray-800">
                                        <div className="flex items-center gap-2">
                                            <FiUsers size={14} />
                                            <span>{r.currentPlayers || 0} / {r.maxPlayers || 4}</span>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            MadeBy.{r.madeName}
                                        </div>
                                    </div>
                                </div>
                                {selectedRoom === r.roomId ? (
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            value={passwordInput}
                                            onChange={(e) => setPasswordInput(e.target.value)}
                                            placeholder="비밀번호를 입력하세요"
                                            className="w-full px-4 py-2.5 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            autoFocus
                                        />
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handlePasswordSubmit(r.roomId)}
                                                className="flex-1 bg-purple-600 hover:bg-purple-700"
                                                disabled={!passwordInput.trim()}
                                            >
                                                입장
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setSelectedRoom(null);
                                                    setPasswordInput('');
                                                }}
                                                variant="ghost"
                                            >
                                                취소
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button 
                                            onClick={() => handleJoinClick(r)}
                                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                        >
                                            참가
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}