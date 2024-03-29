const TextInput = ({
  label,
  placeholder,
  className,
  labelClassName,
  register,
  registerName,
  error,
  pattern,
  patternErr,
}) => {
  return (
    <div
      className={`textInputDiv flex flex-col space-y-2 w-full  ${className}`}
    >
      <label
        htmlFor={label}
        className={`font-semibold ${labelClassName} flex items-center justify-between`}
      >
        <span>{label}</span>
        <span>
          {error && (
            <div className="text-sm text-red-700">{error ? error : ""}</div>
          )}
        </span>
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="p-3 border-1 text-white border-gray-400 border-solid rounded placeholder-gray-500 bg-transparent transition-shadow "
        id={label}
        {...register(registerName, {
          required: `${registerName} is required`,
          pattern: pattern
            ? {
                value: pattern,
                message: patternErr ? patternErr : "Invalid input",
              }
            : undefined,
        })}
      />
    </div>
  );
};

export default TextInput;
