const TextInput = ({
    label,
    placeholder,
    className,
    value,
    setValue,
    labelClassName,
}) => {
    return (
        <div
            className={`textInputDiv flex flex-col space-y-2 w-full  ${className}`}
        >
            <label for={label} className={`font-semibold ${labelClassName}`}>
                {label}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                className="p-3 border text-white border-gray-400 border-solid rounded placeholder-gray-500 bg-transparent transition-shadow "
                id={label}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
        </div>
    );
};

export default TextInput;
