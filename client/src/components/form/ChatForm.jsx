import React, { useState } from 'react';

import useUserInfo from "@hooks/user/useUserInfo";
import useAutoScroll from '@hooks/utils/useAutoScroll'
import useAutoConnect from '@hooks/socket/useAutoConnect'
import useSendMessages from '@hooks/socket/useSendMessages'
import useChatMessages from '@hooks/socket/useChatMessages'

import GameInput from '@ui/game/GameInput';
import GameButton from '@ui/game/GameButton';
import GameMessage from '@ui/game/GameMessage';

import useMoveSocket from '@hooks/socket/useMoveSocket'

export default function ChatForm({ type }) {
    const [input, setInput] = useState('');
    const MAX_MESSAGE_LENGTH = 200;

    const { user } = useUserInfo({ enabled:false });
    const { socket } = useAutoConnect();
    const { messages } = useChatMessages(socket, 100);

    const { 
        messagesEndRef, 
        containerRef, 
        handleWheel,
        setIsUserScrolling,
    } = useAutoScroll(5000, messages);
    
    useMoveSocket({
        user,
        socket,
        type,
    });

    const handleSendMessage = (e) => {
        e.preventDefault();
        useSendMessages(user, socket, input, MAX_MESSAGE_LENGTH);
        setInput("");
        setIsUserScrolling(false);
    };

    return (
        <div className="flex flex-col h-[500px] w-full">
            <div 
                ref={containerRef}
                onWheel={handleWheel}
                className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 scrollbar-hide"
            >
                {messages.map((msg, index) => (
                    <GameMessage key={index} className="break-words">
                        <div>
                            <div className="font-extrabold text-purple-700 text-sm">
                                {msg.nickname}
                            </div>
                            <div className="text-gray-800 text-sm break-words">
                                {msg.message}
                            </div>
                        </div>
                    </GameMessage>
                ))}
                <div ref={messagesEndRef} />
            </div>
            {user ? (
                <form onSubmit={handleSendMessage} className="border-t border-gray-200 pt-4">
                    <div className="flex gap-2 flex-col">
                        <div className="flex gap-2">
                            <GameInput
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                variant="chat"
                                className="flex-1 min-w-0"
                                maxLength={MAX_MESSAGE_LENGTH}
                            />
                            <GameButton 
                                type="submit" 
                                className="flex-shrink-0"
                                disabled={!input.trim() || input.length > MAX_MESSAGE_LENGTH}
                            >
                                Send
                            </GameButton>
                        </div>
                        <div className="text-xs text-gray-400 text-right">
                            {input.length}/{MAX_MESSAGE_LENGTH}
                        </div>
                    </div>
                </form>
            ) : (
                <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-center py-3 px-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 text-center">
                            🔒 로그인 후 참여할 수 있습니다.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
