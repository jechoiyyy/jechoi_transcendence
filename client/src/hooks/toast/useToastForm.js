import { useEffect } from 'react';

import { useToast } from '@contexts/ToastContext';

export default function useToastForm(message, options = {}, condition=true) {
  const { duration = 3000, type = 'info' } = options;
  const { showToast } = useToast();

  useEffect(() => {
    if (!message || !condition) return;
    showToast(message, type, duration);
  }, [message, condition]);
}