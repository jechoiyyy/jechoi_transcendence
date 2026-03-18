import React, { useState } from "react";

import useEmailAuth from "@hooks/auth/useEmailAuth";
import useTimer from "@hooks/utils/useTimer";

import { navigationRef } from "@utils/navigation";

import Card from "@ui/base/Card";
import Button from "@ui/base/Button";
import VerificationCodeInput from "@ui/auth/VerificationCodeInput";

const EmailAuthForm = ({ email = '이메일', onBack, onResend }) => {
    const [code, setCode] = useState("");
    const [canResend, setCanResend] = useState(false);
    const { timer, resetTimer } = useTimer(600, () => setCanResend(true));
    const { verify, loading, error } = useEmailAuth(() => navigationRef.navigate("/login"));

    const handleResend = async () => {
        await onResend();
        resetTimer();
        setCanResend(false);
        setCode("");
    };

    const submit = async (e) => {
        e.preventDefault();
        verify({ email, code });
    };

    return (
        <Card className="max-w-md mx-auto">
            <form onSubmit={submit} className="flex flex-col gap-4">
                <VerificationCodeInput
                    email={email}
                    code={code}
                    onChange={(e) => setCode(e.target.value)}
                    timer={timer}
                    canResend={canResend}
                    loading={loading}
                    onResend={handleResend}
                />
                
                <div className="h-5">
                    {error && <div className="text-sm text-red-500">{error}</div>}
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                    <Button 
                        type="button" 
                        variant="secondary"
                        onClick={onBack}
                    >
                        뒤로
                    </Button>
                    <Button 
                        type="submit" 
                        disabled={loading || !code}
                        className="flex-1"
                    >
                        {loading ? "인증 중..." : "인증 완료"}
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default EmailAuthForm;