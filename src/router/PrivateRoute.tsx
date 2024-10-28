import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useReduxStore } from "../store";
import { mainPath } from "./mainRouter";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {

  const { auth, dispatch } = useReduxStore();
  const user = auth?.user;
  const token = auth?.token;

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp && (decodedToken?.exp * 1000 < Date.now())) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'logout' });
        navigate(`${mainPath}auth/login`, { replace: true });
      }

    }
  }, [dispatch, navigate, token]);

  useEffect(() => {

    if (!user || !token) {
      navigate(`${mainPath}auth/login`, { replace: true });
      dispatch({ type: 'logout' });
    }

  }, [dispatch, location.pathname, navigate, token, user]);


  return user?.id ? children : <Navigate
    to={`${mainPath}auth/login`}
    replace
  />;
};
