import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { TodoContext } from "../context/TodoContext";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";
const AddTodo = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, getTodos, addTodo } = useContext(TodoContext);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await addTodo(data);
      getTodos();
      reset();
      if (user) {
        navigate("/todo");
      } else {
        navigate("/login");
      }
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
          <h2 className="text-center mb-3 text-lg sm:text-xl text-gray-900 md:text-2xl font-bold">
            Add Todo
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row gap-2 md:gap-2"
          >
            <input
              type="text"
              className="border border-gray-500 text-gray-900 rounded w-full p-2"
              {...register("todo", { required: "Todo is required" })}
              placeholder="Enter todo..."
            />
            <button className="bg-gray-900 text-white font-semibold hover:bg-gray-800  px-6 py-2 rounded cursor-pointer">
              {loading ? <Loader /> : "Add"}
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

export default AddTodo;
