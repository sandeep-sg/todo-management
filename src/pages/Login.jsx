import { useForm } from "react-hook-form";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { TodoContext } from "../context/TodoContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { checkAuth, getTodos } = useContext(TodoContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
  console.log(import.meta.env.VITE_BACKEND_URL);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        data,
        { withCredentials: true }
      );
      checkAuth();
      getTodos();
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
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
            Login
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
            {loading ? <Loader /> : "Login"}
          </button>
          <div>
            <p className="text-center text-sm">
              <a href="/forgot-password" className="text-blue-500 font-bold">
                Forgot Password ?
              </a>
            </p>
            <p className="text-center text-sm">
              Dont&rsquo;t have an account?{" "}
              <a href="/signup" className="text-blue-500 font-bold">
                Signup
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
