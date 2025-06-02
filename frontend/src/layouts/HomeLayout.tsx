import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const HomeLayout = () => {
  return (
    <div className="">
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
