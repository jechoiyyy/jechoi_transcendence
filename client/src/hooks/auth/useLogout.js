import { useState } from 'react';

import authService from '@api/auth.api';

export default function useLogout(onSuccess) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const logout = async () => {
        setError(null);
        setLoading(true);

        try {
            await authService.logout();
            onSuccess();
        } catch (e) {
            setError("로그아웃 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };
    return { logout, loading, error };
};
