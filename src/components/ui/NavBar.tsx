import React from 'react';
import { Link } from "react-router-dom";
import { mainPath } from "../../router";
import { useReduxStore } from "../../store";

interface NavBarProps {
  className?: string;
}

export const NavBar: React.FC<NavBarProps> = () => {
  const { auth, dispatch } = useReduxStore();
  const user = auth?.user;

  return (
    <nav>
      <div className="flex justify-between h-16 px-10 shadow items-center">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl lg:text-2xl font-bold cursor-pointer">MM</h1>
          <div className="hidden md:flex justify-around space-x-4">
            <Link to={mainPath} className="hover:text-indigo-600 text-gray-700">Home</Link>
            {user &&
              <>
                <Link to="/content" className="hover:text-indigo-600 text-gray-700">Content</Link>
                <Link to="/categories" className="hover:text-indigo-600 text-gray-700">Categories</Link>
                <Link to="/topics" className="hover:text-indigo-600 text-gray-700">Topics</Link>
              </>}
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          {!user ?
            <>
              <Link to="/auth/login" className="text-gray-800 text-sm">LOGIN</Link>
              <Link to="/auth/register" className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">SIGNUP</Link>
            </> :
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                dispatch({ type: 'logout' });
              }}
              className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-400 text-sm"
            >Logout</button>
          }
        </div>
      </div>
    </nav>
  );
};