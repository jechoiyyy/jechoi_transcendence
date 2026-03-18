import { Navigate, useLocation } from "react-router-dom";
import useUserInfo from "@hooks/user/useUserInfo";

const RoomRoute = ({ children }) => {
  const { user } = useUserInfo({ enabled:false });
  const location = useLocation();

  const allowed =
    user &&
    location.state?.from === "home";

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoomRoute;
