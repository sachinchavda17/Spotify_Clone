import { useState } from "react";

const PasswordInput = ({
  label,
  placeholder,
  className,
  register,
  registerName,
  error,
  pattern,
  patternErr,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`passwordInputDiv flex flex-col space-y-2 w-full ${className} `}
    >
      <label htmlFor={label} className="font-semibold flex items-center justify-between">
      <span>{label}</span>
        <span>
          {error && (
            <div className="text-sm text-red-700">{error ? error : ""}</div>
          )}
        </span>
      </label>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="p-3 border border-lightGray border-solid rounded placeholder-lightGray bg-transparent transition-shadow placeholder:capitalize"
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
      <div>
        <label
          htmlFor={`${label}-showpassword`}
          className="py-1 flex items-center space-x-3 text-sm  text-lightGray"
        >
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            name={`${label}-showpassword`}
            id={`${label}-showpassword`}
            className="w-5 h-5  cursor-pointer "
          />
          <span>Show Password</span>
        </label>
      </div>
    </div>
  );
};

export default PasswordInput;
