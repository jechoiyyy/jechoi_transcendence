
const Checkbox = ({ 
	label, checked, onChange, disabled = false, className = "", ...props 
	}) => {
    return (
        <label className={`flex items-center space-x-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="w-4 h-4 text-blue-600 rounded focus:ring-1 focus:ring-blue-500"
                {...props}
            />
            {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
        </label>
    );
}

export default Checkbox;