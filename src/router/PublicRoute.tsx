import { useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useReduxStore } from "../store";

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
      navigate(`/`, { replace: true });
    }
  }, [token, user, navigate]);


  useEffect(() => {
    handleNavigation();
  }, [handleNavigation,]);

  return children;
};