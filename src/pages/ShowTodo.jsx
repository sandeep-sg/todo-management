import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";

const ShowTodo = () => {
  const [isConfirmBoxOpen, setIsConfirmBoxOpen] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState(null);
  const navigate = useNavigate();
  const { todos, setTodos, deleteTodo, updateTodoStatus, todoLoading } =
    useContext(TodoContext);
  const handleTodoStatus = async (id) => {
    await updateTodoStatus(id);
    setTodos((prevTodo) =>
      prevTodo.map((todo) => {
        return todo._id == id ? { ...todo, completed: !todo.completed } : todo;
      })
    );
  };

  const handleConfirmBox = (id) => {
    setIsConfirmBoxOpen(true);
    setDeleteTodoId(id);
  };
  const handleDeleteTodo = () => {
    deleteTodo(deleteTodoId);
    setIsConfirmBoxOpen(false);
  };
  if (todoLoading) {
    return (
       <div className="w-full min-h-full flex justify-center items-center h-screen">
        <Loader size="lg" />
      </div>
    );
  }
  return (
    <div className="w-[88%] sm:w-full">
      {isConfirmBoxOpen && (
        <div className="bg-[#1e2939d5] w-[80%]  h-full absolute flex justify-center pt-48 items-start">
          <div className="flex flex-col gap-3 bg-white w-[300px]  p-4 rounded-lg ">
            <p>Are you sure you want to delete this todo?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteTodo}
                className="bg-green-500 text-white px-4 py-1 font-semibold rounded cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={() => setIsConfirmBoxOpen(false)}
                className="bg-red-500 text-white px-4 font-semibold py-1 rounded cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container-center">
        {!todos?.length ? (
          <h1 className="text-center text-xl text-white">
            You don&rsquo;t have todo
          </h1>
        ) : (
          <div className="overflow-x-auto w-full text-white">
            <table className="min-w-full border border-white ">
              <thead>
                <tr className="bg-white text-gray-900">
                  <th className="whitespace-nowrap">S no.</th>
                  <th className="whitespace-nowrap">Status</th>
                  <th className="whitespace-nowrap">Todos</th>
                  <th className="whitespace-nowrap">Date & Time</th>
                  <th className="whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {todos?.map(({ todo, completed, createdAt, _id }, index) => {
                  return (
                    <tr key={_id}>
                      <td className="whitespace-nowrap w-16 text-center">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap w-32 text-center">
                        <input
                          type="checkbox"
                          checked={completed}
                          onChange={() => handleTodoStatus(_id)}
                          name=""
                          id=""
                        />
                        <span className="pl-2">
                          {completed ? "Completed" : "Pending"}
                        </span>
                      </td>
                      <td
                        className={`whitespace-nowrap sm:whitespace-normal ${
                          completed && "line-through"
                        }`}
                      >
                        {todo}
                      </td>
                      <td className="whitespace-nowrap w-48 text-center">
                        {new Date(createdAt).toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap w-20">
                        <div className="flex justify-center gap-2">
                          <i
                            onClick={() => navigate(`/update-todo/${_id}`)}
                            className="fa-solid fa-pen-to-square cursor-pointer hover:text-yellow-500"
                          ></i>
                          <i
                            onClick={() => handleConfirmBox(_id)}
                            className="fa-solid fa-trash cursor-pointer hover:text-red-500"
                          ></i>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowTodo;
