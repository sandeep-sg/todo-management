import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Loader from "../components/Loader";

const UpdateTodo = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { getTodos, updateTodo } = useContext(TodoContext);

  const getTodo = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/todos/${id}`, {
      withCredentials: true,
    });
    console.log(res);
    setValue("todo", res.data.todo.todo);
  };
  useEffect(() => {
    getTodo();
  }, [id]);

  // add todo into database..............
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateTodo(id, data);
      getTodos();
      reset();
      navigate("/todo");
    } catch (error) {
      console.error("Error in onSubmit:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full">
      <div className="container-center">
        <div className="max-w-[500px] mx-auto bg-gray-50 p-5 rounded-lg">
          <h1 className="text-center mb-3 text-lg sm:text-xl text-gray-900 md:text-2xl font-bold">
            Update Todo
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row gap-2 md:gap-2"
          >
            <input
              type="text"
              className="border rounded w-full p-2 text-gray-900"
              {...register("todo", { required: "Todo is required" })}
            />
            <button className="bg-gray-900 text-white font-semibold hover:bg-gray-800  px-6 py-2 rounded cursor-pointer">
              {loading ? <Loader size={6} /> : "Update"}
            </button>
          </form>
          {errors.todo && (
            <p role="alert" className="text-red-500 text-base my-1">
              {errors.todo?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;
