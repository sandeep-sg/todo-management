import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import LogoutIcon from "../assets/icons/LogoutIcon";
import Loader from "../components/Loader";

const Profile = () => {
  const { user, setUser, setTodos, checkAuth, userLoading } =
    useContext(TodoContext);
  const navigate = useNavigate();
  const logout = async () => {
    console.log("logout");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      checkAuth();
      setUser(null);
      setTodos([]);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  if (userLoading) {
    return (
      <div className="w-full min-h-full flex justify-center items-center h-screen">
        <Loader size="lg" />
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="container-center ">
        <div className="max-w-[380px] mx-auto bg-gray-50 rounded-lg flex flex-col gap-2 border p-5 my-10 text-gray-900">
          <h3 className="text-center text-lg sm:text-xl  md:text-2xl font-bold">
            Profile
          </h3>
          <div>
            {" "}
            <b>Username</b>: {user?.username}
          </div>
          <div>
            {" "}
            <b>Email</b>: {user?.email}
          </div>
          <button
            onClick={logout}
            className="flex justify-center items-center gap-2 border w-full p-2 mt-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-all ease-in-out cursor-pointer"
          >
            Logout <LogoutIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
