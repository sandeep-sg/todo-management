import { useForm } from "react-hook-form";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { TodoContext } from "../context/TodoContext";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { checkAuth } = useContext(TodoContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const inputData = [
    {
      label: "Username",
      name: "username",
      type: "text",
      errors: { errors },
      rules: {
        required: "Username is required",
        minLength: {
          value: 3,
          message: "username length must be 3 characters",
        },
        maxLength: {
          value: 30,
          message: "Username length must be less then 30 characters",
        },
      },
    },
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
    {
      label: "Password",
      name: "password",
      type: "password",
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
  ];
  const onSubmit = async (data) => {
    console.log(data)
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        data,
        {
          withCredentials: true,
        }
      );
      checkAuth()
      toast.success(res.data.message);
      navigate("/verify-email");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="container-center ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[380px] mx-auto bg-gray-50 rounded-lg flex flex-col gap-5 border p-5 my-10 "
          noValidate={true}
        >
          <h3 className="text-center text-lg sm:text-xl text-gray-900 md:text-2xl font-bold">
            Signup
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
            {loading ? <Loader size={6} /> : "Signup"}
          </button>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 font-bold">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
