import { Outlet } from "react-router";
import Header from "../components/Header";
const Layout = () => {
  return (
    <div className="flex">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
