import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const Dashboard = () => {
  const { todos } = useContext(TodoContext);
  const completeTodo = todos?.filter((todo) => todo.completed);
  const pendingTodo = todos?.filter((todo) => !todo.completed);
  return (
    <div className="w-full">
      <div className="container-center">
        <div className="grid grids-col-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
          <div className="flex flex-col gap-2 justify-center items-center text-2xl text-gray-900 font-bold w-full h-32 md:h-52 bg-gray-50 shadow-2xl rounded-2xl">
            <h3 className="">Total Todo</h3>
            <span className="text-4xl">{todos?.length || 0}</span>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center text-2xl text-gray-900 font-bold w-full h-32 md:h-52 bg-gray-50 shadow-2xl rounded-2xl">
            <h3 className="">Completed Todo</h3>
            <span className="text-4xl">{completeTodo?.length || 0}</span>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center text-2xl text-gray-900 font-bold w-full h-32 md:h-52 bg-gray-50 shadow-2xl rounded-2xl">
            <h3 className="">Pending Todo</h3>
            <span className="text-4xl">{pendingTodo?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
