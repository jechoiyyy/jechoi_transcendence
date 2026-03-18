import { useState } from 'react';

import useUserInfo from "@hooks/user/useUserInfo";

import validateEmail from '@utils/validateEmail'

import authService from '@api/auth.api';

export default function useLogin(onSuccess) {
    const { setUser } = useUserInfo({ enabled:false });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async ({ email, password }) => {
        setError(null);

        if (!validateEmail(email)) {
            setError("유효한 이메일을 입력하세요.");
            return;
        }
        if (!password) {
            setError("비밀번호를 입력하세요.");
            return;
        }
        setLoading(true);
        try {
            const userData = await authService.login({ email, password });
            setUser(userData);
            onSuccess();
        } catch (e) {
            const code = e.response?.status || 500;
            if (code === 400 || code == 401) {
                setError("이메일이나 비밀번호가 잘못되었습니다.");
            } else {
                setError("로그인 중 오류가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}