import { useState } from 'react';

import validateEmail from '@utils/validateEmail'

import authService from '@api/auth.api';

export default function useSignup(onSuccess) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signup = async ({ email, password, confirm }) => {
        setError(null);

        if (!validateEmail(email)) {
            setError("유효한 이메일을 입력하세요.");
            return;
        }
        if (password.length < 6) {
            setError("비밀번호는 최소 6자 이상입니다.");
            return;
        }
        if (password !== confirm) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }
        setLoading(true);

        try {
            await authService.signup({ email, password });
            onSuccess();
        } catch (e) {
            const code = e.response?.status || 500;
            if (code === 409) {
                setError("이미 존재하는 이메일계정입니다.");
            }
            else if (code == 400) {
                setError("잘못된 형식입니다.");
            } else {
                setError("회원가입 중 오류가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    return { signup, loading, error };
};
