import { Navigate } from "react-router-dom";
import { useAccount } from "../hook/useAccount";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const PrivateRoute = ({ children, authRoles }) => {
  const { user, isLoading } = useAccount();
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("common");

  if (!user && !isLoading) {
    return <Navigate to="/" />;
  }

  if (!user || (!authRoles.includes(user?.role) && !isLoading)) {
    return <Navigate to="/home" />;
  }

  return children;
};
