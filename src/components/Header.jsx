// import { useState } from "react";
import { NavLink } from "react-router";
import MenuIcon from "../assets/icons/MenuIcon";
import { useContext, useState } from "react";
import CloseIcon from "../assets/icons/CloseIcon";
import { TodoContext } from "../context/TodoContext";
import LoginIcon from "../assets/icons/LoginIcon";
import ProfileIcon from "../assets/icons/ProfileIcon";
import AddIcon from "../assets/icons/AddIcon";
import AllIcon from "../assets/icons/AllIcon";
import DashboardIcon from "../assets/icons/DashboardIcon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(TodoContext);
  const navLink = [
    {
      name: "Dashboard",
      path: "/",
      icon: <DashboardIcon />,
    },
    {
      name: "Add Todo",
      path: "add-todo",
      icon: <AddIcon />,
    },
    {
      name: "All Todo",
      path: "todo",
      icon: <AllIcon />,
    },
    user
      ? {
          name: "Profile",
          path: "profile",
          icon: <ProfileIcon />,
        }
      : {
          name: "Login",
          path: "login",
          icon: <LoginIcon />,
        },
  ];
  const handleSideMenu = () => {
    setIsMenuOpen(true);
  };
  const closeSideMenu = () => {
    setIsMenuOpen(false);
  };
  document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  return (
    <>
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed z-40 bg-[#000a] md:hidden w-full h-screen"
        ></div>
      )}
      <div className="relative">
        <header>
          {/* small screen nav */}
          <nav
            className={` ${
              isMenuOpen ? " -right-60 " : "right-0 "
            } absolute w-60 bg-gray-900 md:hidden duration-300 text-white py-12 px-2 min-h-screen z-50 `}
          >
            <ul className="flex flex-col gap-1 ">
              {navLink?.map(({ name, path,icon }, index) => {
                return (
                  <NavLink
                    to={path}
                    key={index}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gray-700 w-full px-3 py-2 rounded  hover:bg-gray-700 hover:text-white cursor-pointer "
                        : " w-full px-3 py-2 rounded  hover:bg-gray-700 hover:text-white cursor-pointer"
                    }
                  >
                   <li className="flex gap-2.5 items-center">
                      {icon}
                      {name}{" "}
                    </li>
                  </NavLink>
                );
              })}
            </ul>
            <div className="absolute top-3 right-3 cursor-pointer">
              <CloseIcon closeSideMenu={closeSideMenu} />
            </div>
          </nav>
          {/* large screeen nav */}
          <nav className="hidden md:block w-60 lg:w-64 bg-gray-900 text-white  p-2 min-h-screen ">
            <ul className="flex flex-col gap-1 ">
              {navLink?.map(({ name, path, icon }, index) => {
                return (
                  <NavLink
                    to={path}
                    key={index}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gray-700 w-full px-3 py-2 rounded  hover:bg-gray-700 cursor-pointer "
                        : " w-full px-3 py-2 rounded  hover:bg-gray-700 transition-all ease-in-out  duration-100 cursor-pointer"
                    }
                  >
                    <li className="flex gap-2.5 items-center">
                      {icon}
                      {name}{" "}
                    </li>
                  </NavLink>
                );
              })}
            </ul>
          </nav>
        </header>
      </div>
      <div className="block md:hidden bg-gray-900 p-5 ">
        <MenuIcon handleSideMenu={handleSideMenu} />
      </div>
    </>
  );
};

export default Header;
