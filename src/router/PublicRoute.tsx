import { useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useReduxStore } from "../store";
import { mainPath } from "./mainRouter";

interface PublicRouteProps {
  children: JSX.Element;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { auth } = useReduxStore();
  const user = auth?.user;
  const token = auth?.token;

  const handleNavigation = useCallback(() => {
    if (token && user) {
      navigate(`${mainPath}`, { replace: true });
    }
  }, [token, user, navigate]);


  useEffect(() => {
    handleNavigation();
  }, [handleNavigation,]);

  return children;
};