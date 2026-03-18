import React from 'react';
import { Link } from "react-router-dom";

import useUserInfo from "@hooks/user/useUserInfo";
import useLogout from "@hooks/auth/useLogout";

import GameButton from "@ui/game/GameButton";

const Navbar = () => {
    const { user, setUser } = useUserInfo({ enabled:false });
    const { logout } = useLogout(() =>  setUser(null));

    const submit = (e) => {
        e.preventDefault();
        logout();
    };

    return (
        <nav className="w-full flex items-center justify-between py-4 px-6 bg-black/50 backdrop-blur-lg border-b border-white/10">
            <div className="flex items-center gap-3">
                <Link to={user ? "/home" : "/login"} className="text-xl font-semibold text-white hover:text-purple-300 transition-colors">
                    ft_transcendence
                </Link>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
                <Link to={user ? "/home" : "/login"} className="h-10 flex items-center justify-center text-white text-3xl font-extrabold px-4 hover:text-purple-200 transition-all duration-300 drop-shadow-[0_0_10px_rgba(168,185,247,0.5)]">
                    🂡 Card Game 🂱
                </Link>
            </div>
            <div className="flex items-center gap-3">
                {!user ? (
                    <>
                        <Link to="/login">
                            <GameButton variant="secondary">Login</GameButton>
                        </Link>
                        <Link to="/signup">
                            <GameButton variant="glass">Sign up</GameButton>
                        </Link>
                    </>
                ) : (
                    <>
                        <form onSubmit={submit} className="flex flex-col gap-4">
                            <GameButton variant="secondary" type="submit">
                                Logout
                            </GameButton>
                        </form>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;