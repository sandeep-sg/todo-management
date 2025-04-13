import { useState } from "react";
import EyeIcon from "../assets/icons/EyeIcon";
import CloseEyeIcon from "../assets/icons/CloseEyeIcon";

const Input = ({ label, name, register, errors, rules, type = "text" }) => {
  const handleBlur = (e) => {
    const labelElement = e.target.nextElementSibling;
    if (labelElement && e.target.value.trim() === "") {
      labelElement.classList.remove(
        "transform",
        "-translate-y-6",
        "-translate-x-1",
        "text-white",
        "bg-gray-800",
        "text-sm",
        "px-2",
        "rounded",
        "py-0.5"
      );
    }
  };
  const handleFocus = (e) => {
    const labelElement = e.target.nextElementSibling;
    if (labelElement) {
      labelElement.classList.add(
        "transform",
        "-translate-y-6",
        "-translate-x-1",
        "text-white",
        "bg-gray-800",
        "text-sm",
        "px-2",
        "rounded",
        "py-0.5"
      );
    }
  };
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleHideShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };
  return (
    <div className="flex flex-col relative">
      <input
        type={type == "password" && isShowPassword ? "text" : type}
        {...register(name, rules, { required: true })}
        id={name}
        // autoComplete="off"
        name={name}
        className="border border-gray-400 py-2 px-3 rounded"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label
        htmlFor={name}
        className={`absolute top-2 left-3 text-gray-500  transition-all duration-200 cursor-text`}
      >
        {label || name}
      </label>
      <span onClick={handleHideShowPassword} className="absolute right-5 top-2">
        {type == "password" ? (
        isShowPassword ? (
            <EyeIcon />
          ) : (
            <CloseEyeIcon />
          )
        ) : (
          ""
        )}
      </span>
      {errors.errors[name] && (
        <p className="text-red-500 text-sm">{errors.errors[name]?.message}</p>
      )}
    </div>
  );
};
export default Input;
