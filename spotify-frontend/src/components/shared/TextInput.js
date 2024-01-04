const TextInput = ({
    label,
    placeholder,
    className,
    labelClassName,
    register,
    registerName,
    errors
}) => {
    return (
        <div
            className={`textInputDiv flex flex-col space-y-2 w-full  ${className}`}
        >
            <label htmlFor={label} className={`font-semibold ${labelClassName}`}>
                {label}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                className="p-3 border text-white border-gray-400 border-solid rounded placeholder-gray-500 bg-transparent transition-shadow "
                id={label}
                {...register(registerName, { required: `${registerName} is required` })}
            />
        </div>
    );
};

export default TextInput;
