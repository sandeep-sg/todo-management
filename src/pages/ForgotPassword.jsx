import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`,
        data
      );
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const inputData = [
    {
      label: "Email",
      name: "email",
      type: "email",
      errors: { errors },
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Please enter a valid email",
        },
      },
    },
  ];

  return (
    <div className="w-full">
      <div className="container-center ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[380px] mx-auto bg-gray-50 rounded-lg flex flex-col gap-4 border p-5 my-10 "
          noValidate={true}
        >
          <h3 className="text-center  text-lg sm:text-xl text-gray-900 md:text-2xl font-bold">
            Forgot Password
          </h3>
          {inputData?.map(({ label, errors, name, rules, type }, i) => {
            return (
              <Input
                key={i}
                label={label}
                errors={errors}
                name={name}
                register={register}
                rules={rules}
                type={type}
              />
            );
          })}
          <button
            type="submit"
            className="border w-full p-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-all ease-in-out cursor-pointer"
          >
            {loading ? <Loader size={6} /> : "Send Verification code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
