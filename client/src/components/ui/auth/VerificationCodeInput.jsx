import React from "react";

import Input from "@ui/base/Input";

const VerificationCodeInput = ({ 
    email = '이메일', 
    code, 
    onChange, 
    timer, 
    canResend, 
    loading, 
    onResend 
}) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">이메일 인증</h2>
            <p className="text-sm text-gray-600 font-semibold mb-6">
                {email}로 전송된 인증 코드를 입력해주세요
            </p>
            
            <div>
                <Input 
                    label="인증 코드" 
                    type="text" 
                    value={code} 
                    onChange={onChange}
                    placeholder="인증 코드"
                />
                <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-gray-500">
                        남은 시간: <span className={timer < 60 ? "text-red-500 font-semibold" : "text-gray-700"}>
                            {formatTime(timer)}
                        </span>
                    </p>
                    <button
                        type="button"
                        onClick={onResend}
                        disabled={!canResend || loading}
                        className={`text-sm font-semibold ${
                            canResend && !loading
                                ? "text-blue-600 hover:text-blue-700 cursor-pointer"
                                : "text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        재발송
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerificationCodeInput;