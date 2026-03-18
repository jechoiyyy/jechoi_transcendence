import { useToast } from '@contexts/ToastContext';

import ToastContainer from '@ui/base/ToastContainer';

export default function ToastForm(){
	const { toasts, removeToast } = useToast();

	return (
		<ToastContainer toasts={toasts} onClose={removeToast} />
	)
}