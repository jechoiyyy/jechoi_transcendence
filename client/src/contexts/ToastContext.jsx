import { createContext, useState, useContext } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    
    setToasts(prev => [...prev, { id, message, type, visible: true }]);
    
    setTimeout(() => {
      setToasts(prev => 
        prev.map(t => t.id === id ? { ...t, visible: false } : t)
      );
      
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 500);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => 
      prev.map(t => t.id === id ? { ...t, visible: false } : t)
    );
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 500);
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
    return useContext(ToastContext);
}