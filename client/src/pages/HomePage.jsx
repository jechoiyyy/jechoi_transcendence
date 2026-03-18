import React, { useState } from "react";

import HomeController from "@controllers/HomeController";
import ChatForm from "@form/ChatForm";
import LobbyForm from "@form/LobbyForm";
import OnlineListForm from "@form/OnlineListForm";
import PlayerInfoForm from "@form/PlayerInfoForm"

import ProfileModal from "@ui/player/ProfileModal";
import CreateRoomModal from "@ui/game/CreateRoomModal";

const HomePage = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);

    return (
        <>
            <HomeController
                isProfileModalOpen={isProfileModalOpen}
                isCreateRoomModalOpen={isCreateRoomModalOpen}
                closeProfileModal={() => setIsProfileModalOpen(false)}
                closeCreateRoomModal={() => setIsCreateRoomModalOpen(false)}
            />
            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-3 gap-6">
                    <section className="md:col-span-2 space-y-4">
                    <div className="space-y-4">
                        <LobbyForm pageSize={4} setIsModalOpen={setIsCreateRoomModalOpen}/>
                        <OnlineListForm pageSize={6} />
                    </div>
                    </section>
                    <aside className="space-y-4">
                        <PlayerInfoForm setIsModalOpen={setIsProfileModalOpen}/>
                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl">
                            <h3 className="font-semibold mb-2">Chat</h3>
                            <ChatForm type="lobby"/>
                        </div>
                    </aside>
                    <ProfileModal isModalOpen={isProfileModalOpen} setIsModalOpen={setIsProfileModalOpen}/>
                    <CreateRoomModal isModalOpen={isCreateRoomModalOpen} setIsModalOpen={setIsCreateRoomModalOpen}/>
                </div>
            </main>
        </>
    );
}

export default HomePage;