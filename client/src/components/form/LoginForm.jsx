import React, { useState } from "react";

import useLogin from "@hooks/auth/useLogin";

import { navigationRef } from "@utils/navigation";

import Card from "@ui/base/Card";
import Input from "@ui/base/Input";
import Button from "@ui/base/Button";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, loading, error } = useLogin(() => navigationRef.navigate("/"));

    const submit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <Card className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Welcome back</h2>
            <p className="text-sm text-gray-600 font-semibold mb-6">계정에 로그인해 바로 시작</p>
            <form onSubmit={submit} className="flex flex-col gap-4">
                <Input label="이메일" type="email" autoComplete="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <Input label="비밀번호" type="password" autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <div className="h-5">
                    {error && <div className="text-sm text-red-500">{error}</div>}
                </div>
                <div className="flex items-center">
                    <Button type="submit" disabled={loading}> 
                        {loading ? "로그인 중..." : "로그인"}
                    </Button>
                </div>
            </form>
        </Card>
    );
}

export default LoginForm;