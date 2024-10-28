import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { mApi } from '../../api'; // Importa la instancia de Axios configurada
import { useForm } from '../../hooks';

interface RegisterFormState {
  username: string;
  name: string;
  email: string;
  password: string;
  role: 'reader' | 'creator' | 'admin';
}

const initialState: RegisterFormState = {
  username: '',
  name: '',
  email: '',
  password: '',
  role: 'reader',
};

const validate = (field: keyof RegisterFormState, values: RegisterFormState): string | null => {
  switch (field) {
    case 'username':
      if (!values.username) return 'Username is required';
      break;
    case 'email':
      if (!values.email) return 'Email is required';
      if (!/\S+@\S+\.\S+/.test(values.email)) return 'Email is invalid';
      break;
    case 'password':
      if (!values.password) return 'Password is required';
      if (values.password.length < 6) return 'Password must be at least 6 characters';
      break;
    case 'name':
      if (!values.name) return 'Name is required';
      break;
    default:
      break;
  }
  return null;
};

export const RegisterScreen: React.FC = () => {
  const navigate = useNavigate();

  const { values, errors, handleChange, resetForm, isValidForm } = useForm<RegisterFormState>({
    initialState,
    validate,
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidForm()) return;

    try {
      // Registrar usuario
      const registerResponse = await mApi.post('auth/new', values);

      console.log(`🚀 ~ handleRegister ~ registerResponse:`, registerResponse);


      if (registerResponse.status === 201) {
        // Redirigir o mostrar mensaje de éxito
        alert('Registration successful');
        navigate('/auth/login');
      } else {
        alert('Failed to register');
      }
      resetForm();
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration');
    }
  };

  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">Multimedia</h1>
          <p className="text-white mt-1">The most popular peer to peer lending at SEA</p>
          <button type="button" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white" onSubmit={handleRegister}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              required
            />
          </div>
          {errors.usernameError && <p className="text-red-500">{errors.usernameError}</p>}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name="name"
              placeholder="Your name"
              value={values.name}
              onChange={handleChange}
              required
            />
          </div>
          {errors.nameError && <p className="text-red-500">{errors.nameError}</p>}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="email"
              name="email"
              placeholder="Email Address"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>
          {errors.emailError && <p className="text-red-500">{errors.emailError}</p>}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          {errors.passwordError && <p className="text-red-500">{errors.passwordError}</p>}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <select
              className="pl-2 outline-none border-none w-full"
              name="role"
              value={values.role}
              onChange={handleChange}
              required
            >
              <option value="reader">Lector</option>
              <option value="creator">Creador</option>
            </select>
          </div>
          <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Register</button>
          <Link
            to="/auth/login"
            className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Already Have an account?</Link>
        </form>
      </div>
    </div>
  );
};