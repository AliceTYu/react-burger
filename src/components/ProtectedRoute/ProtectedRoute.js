import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ onlyUnAuth = false, children }) => {
  const location = useLocation();

  const ForgotPasswordId = localStorage.getItem("ForgotPasswordId");

  const user = useSelector((state) => state.loginEmailReducer.user);

  const protectedRoutes = ["/register", "/forgot-password", "/reset-password"];

  if (onlyUnAuth && Object.keys(user).length !== 0) {
    if (protectedRoutes.includes(location.pathname)) {
      return <Navigate to="/" replace />;
    } else if (location.state?.from?.pathname) {
      return <Navigate to={location.state?.from?.pathname} />;
    }

    if (location.pathname === "/login") {
      return <Navigate to={"/"} />;
    }
  }

  if (location.pathname === "/reset-password" && !ForgotPasswordId) {
    return <Navigate to="/forgot-password" replace />;
  }

  if (location.pathname === "/forgot-password" && ForgotPasswordId) {
    return <Navigate to="/reset-password" replace />;
  }

  if (!onlyUnAuth && Object.keys(user).length === 0) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
