import { useState } from "react";

const PasswordInput = ({
  label,
  placeholder,
  className,
  register,
  registerName,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`textInputDiv flex flex-col space-y-2 w-full ${className} `}
    >
      <label htmlFor={label} className="font-semibold">
        {label}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="p-3 border border-gray-400 border-solid rounded placeholder-gray-500 bg-transparent transition-shadow"
        id={label}
        {...register(registerName, { required: `${registerName} is required` })}
      />
      <div>
        <label
          htmlFor="showpassword"
          className="py-3 flex items-center space-x-3 text-sm  text-gray-400"
        >
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            name="showpassword"
            id="showpassword"
            className="w-5 h-5  cursor-pointer "
          />
          <span>Show Password</span>
        </label>
      </div>
      {error && (<div className="text-red w-full">{error.message}</div>)}
    </div>
  );
};

export default PasswordInput;
