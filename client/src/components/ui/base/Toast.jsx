import { 
  HiXMark, 
  HiMiniCheck, 
  HiOutlineInformationCircle,
  HiOutlineExclamationCircle 
} from "react-icons/hi2";

export default function Toast({ message, type, onClose, visible = true }) {
  const icons = {
    success: <HiMiniCheck size={20} />,
    error: <HiOutlineExclamationCircle size={20} />,
    info: <HiOutlineInformationCircle size={20} />,
  };
  
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };
  
  const toastContent = (
    <div
      className={`${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3
                  transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {icons[type]}
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="hover:bg-white hover:bg-opacity-20 rounded p-1">
        <HiXMark size={18} />
      </button>
    </div>
  );
  
  // Portal 사용하지 않는 버전 (Container에서 Portal 사용)
  return toastContent;
}