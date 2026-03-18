import { useState } from "react";

import authService from '@api/auth.api';

export default function useEmailAuth(onSuccess) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const verify = async ({ email, code }) => {
        try {
            setLoading(true);
	        setError(null);
            await authService.emailauth({ email, code });
            onSuccess();
        } catch (e) {
            const code = e.response?.status || 500;
            if (code === 401) {
                setError("코드가 만료되었거나 잘못되었습니다.");
            } else {
                setError("회원가입 중 오류가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };
    return { verify, loading, error };
};
