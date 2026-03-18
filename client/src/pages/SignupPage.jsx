import React from "react";

import SignupForm from "@form/SignupForm";

const SignupPage = () => {
    return (
    <main className="max-w-4xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-14 items-start">
            <div>
                <h1 className="text-4xl font-extrabold text-white mt-24 mb-4">Create your account</h1>
                <p className="text-white/80 font-semibold">
                    계정을 만들고 게임을 시작해보세요.
                </p>
            </div>
            <div>
                <SignupForm />
            </div>
        </div>
    </main>
    );
}

export default SignupPage;