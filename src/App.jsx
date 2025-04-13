import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router";
import { TodoContext } from "./context/TodoContext";
import ShowTodo from "./pages/ShowTodo";
import AddTodo from "./pages/AddTodo";
import UpdateTodo from "./pages/UpdateTodo";
import { ToastContainer, toast } from "react-toastify";
import Layout from "./Layout/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
// import Header from "./components/Header";
function App() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);

  //  get data from database............
  const getTodos = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/todos`, {
        withCredentials: true,
      });
      setTodos(res.data.todo);
    } catch (error) {
      console.log("server error", error);
    }
  };
  // add todo in database ...........
  const addTodo = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/todos`,
        data,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // delete todo from database............
  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/todos/${id}`,
        {
          withCredentials: true,
        }
      );
      getTodos();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // update todo in database ..............
  const updateTodo = async (id, data) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/todos/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  // update todo status .............
  const updateTodoStatus = async (id) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/todos/${id}`,
        null,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  //check-user
  const checkAuth = async () => {
    try {
      const user = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/check-auth`,
        {
          withCredentials: true,
        }
      );
      setUser(user.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(user)
  useEffect(() => {
    getTodos();
    checkAuth();
  }, []);
  return (
    <div className="main-continer">
      <TodoContext.Provider
        value={{
          user,
          setUser,
          todos,
          setTodos,
          getTodos,
          addTodo,
          deleteTodo,
          updateTodo,
          updateTodoStatus,
          checkAuth,
        }}
      >
        <BrowserRouter>
          <h1 className="text-center bg-gray-900 text-white py-3 text-lg sm:text-xl md:text-2xl font-bold">
            Todo Management
          </h1>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="signup" element={<Signup />} />
              <Route path="verify-email" element={<VerifyEmail />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
              <Route path="login" element={<Login />} />
              <Route path="todo" element={<ShowTodo />} />
              <Route path="add-todo" element={<AddTodo />} />
              <Route path="update-todo/:id" element={<UpdateTodo />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </TodoContext.Provider>
    </div>
  );
}

export default App;
