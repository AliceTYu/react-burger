import { Navigate, useLocation } from "react-router-dom";
import { useTypesSelector } from "../../services/reducers";

const ProtectedRoute = ({ onlyUnAuth = false, children }) => {
  const location = useLocation();

  const ForgotPasswordId = localStorage.getItem("ForgotPasswordId");

  const user = useTypesSelector((state) => state.loginEmailReducer.user);

  const protectedRoutes = ["/register", "/forgot-password", "/reset-password"];

  if (onlyUnAuth && user) {
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

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
