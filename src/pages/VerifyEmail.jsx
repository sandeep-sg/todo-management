import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { TodoContext } from "../context/TodoContext";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const { checkAuth } = useContext(TodoContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const inputData = [
    {
      label: "Verification code",
      name: "code",
      type: "number",
      errors: { errors },

      rules: {
        required: "Enter Verification code",
        minLength: {
          value: 6,
          message: "Verification code length must be 6",
        },
        maxLength: {
          value: 6,
          message: "Verification code length must be 6 ",
        },
      },
    },
  ];
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-email`,
        data
      );
      checkAuth();
      toast.success(res.data.message);
      navigate("/add-todo");
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
          className="max-w-[380px] mx-auto bg-gray-50 rounded-lg flex flex-col gap-4 border p-5 my-10 "
          noValidate={true}
        >
          <h3 className="text-center  text-lg sm:text-xl text-gray-900 md:text-2xl font-bold">
            Email Verification
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
            {loading ? <Loader size={6} /> : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
