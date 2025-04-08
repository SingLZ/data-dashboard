import { Outlet, Link } from "react-router-dom";
import SideNav from "../Components/SideNav";
const Layout = () => {
  return (
    <div className="layout">
      <SideNav />
      <div className="content">
      <Outlet />
      </div>
    </div>
  );
};

export default Layout;
