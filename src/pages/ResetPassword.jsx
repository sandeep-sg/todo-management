import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {token} = useParams()
  const onSubmit = async (data) => {
    const {password,confirmPassword} = data
    if(password !== confirmPassword){
        return toast.error("Password and Confirm Password must be same")
    }
    console.log(data)
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password/${token}`,
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
      label: "Password",
      name: "password",
      type: "text",
      errors: { errors },
      rules: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password length must be 6 character",
        },
        maxLength: {
          value: 50,
          message: "Password length must be less then 50 ",
        },
      },
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      errors: { errors },
      rules: {
        required: "Confirm Password is required",
        minLength: {
          value: 3,
          message: "Confirm Password length must be 3 character",
        },
        maxLength: {
          value: 50,
          message: "Confirm Password length must be less then 50 ",
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
            Reset Password
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
            {loading ? <Loader size={6} /> : "Set Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
