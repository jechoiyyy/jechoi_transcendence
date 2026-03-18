import { createPortal } from 'react-dom';
import Toast from './Toast';

export default function ToastContainer({ toasts, onClose }) {
  const content = (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onClose(toast.id)}
          visible={toast.visible}
        />
      ))}
    </div>
  );
  
  return createPortal(content, document.body);
}