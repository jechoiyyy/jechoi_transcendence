import React, { useState } from "react";

import useSignup from "@hooks/auth/useSignup";

import EmailAuthForm from "@form/EmailAuthForm";
import Card from "@ui/base/Card";
import Input from "@ui/base/Input";
import Button from "@ui/base/Button";

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showVerification, setShowVerification] = useState(false);

    const { signup, loading, error } = useSignup(() => setShowVerification(true));

    const submit = async (e) => {
        e.preventDefault();
        signup({ email, password, confirm });
    };

    const handleResend = async () => {
        await signup({ email, password, confirm });
    };

    if (showVerification) {
        return (
            <EmailAuthForm 
                email={email}
                onBack={() => setShowVerification(false)}
                onResend={handleResend}
            />
        );
    }

    return (
        <Card className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Create account</h2>
            <p className="text-sm text-gray-600 font-semibold mb-6">간단한 정보만을 입력하고 회원가입하기</p>
            <form onSubmit={submit} className="flex flex-col gap-4">
                <Input label="이메일" type="email" autoComplete="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <Input label="비밀번호"  type="password" autoComplete="new-password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <Input label="비밀번호 확인" type="password" autoComplete="new-password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} />
                <div className="h-5">
                    {error && <div className="text-sm text-red-500">{error}</div>}
                </div>
                <div className="flex items-center">
                    <Button type="submit" disabled={loading}>
                        {loading ? "등록 중..." : "회원가입"}
                    </Button>
                </div>
            </form>
        </Card>
    );
}

export default SignupForm;