import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.authReducer);
  return user && user.id != null ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
