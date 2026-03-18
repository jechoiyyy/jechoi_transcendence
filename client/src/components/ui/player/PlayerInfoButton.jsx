import React from 'react';
import { LuUser } from "react-icons/lu";

import Button from '@ui/base/Button';

export default function PlayerInfoButton({ setIsModalOpen }) {

    return (
        <>
            <h4 className="font-bold text-lg mb-3 text-gray-800 flex items-center">
                <Button
                    variant="ghost"
                    onClick={() => setIsModalOpen(true)}
                >
                    <div className="flex items-center gap-3 hover:scale-[1.03]">
                        <LuUser size={30} />
                        Player Info
                    </div>
                </Button>
            </h4>
        </>
    );
}
