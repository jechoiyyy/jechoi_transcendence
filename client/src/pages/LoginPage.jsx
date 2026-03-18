import React from "react";

import LoginForm from "@form/LoginForm";

const LoginPage = () => {
    return (
    <main className="max-w-4xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-14 items-start">
            <div>
                <div className="mr-4 mt-24">
                    <h1 className="text-4xl font-extrabold text-white mb-4">Login to play Game</h1>
                    <p className="text-white/80 font-semibold mb-1">
                        친구와 실시간으로 게임을 즐기세요.
                    </p>
                    <p className="text-white/80 font-semibold">
                        계정을 생성하고 게임을 만들어보세요.
                    </p>
                </div>
            </div>
            <div>
                <LoginForm />
            </div>
        </div>
    </main>
    );
}

export default LoginPage;