import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Layout = () => {
  const user = useSelector((state) => state.authSlice.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
