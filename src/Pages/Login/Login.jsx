import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaSpinner } from "react-icons/fa";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { UserToken } from '../../Context/UserTokenProvider';
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useContext(UserToken);
  const navigate = useNavigate();
  const callLoginAPI = async (userValues) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, userValues)
      console.log(data);
      setToken(data.token);
      localStorage.setItem("UserToken", data.token);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  }
  const validateInputs = Yup.object({
    email: Yup.string().email("Invalid email").required("Your email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "Invalid Password, Password starts with capital letter").required("Password is required!"),
  })
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateInputs,
    onSubmit: callLoginAPI
  })
  return (
    <>
      <div className="flex flex-col flex-1 justify-center px-6 py-12 lg:px-8 rounded-md w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={loginForm.handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                  value={loginForm.values.email}
                  autoComplete="email"
                  placeholder='test@gmail.com'
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6"
                />
              </div>
              {loginForm.errors.email && loginForm.touched.email && <p className='text-red-500 mt-2'>{loginForm.errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                  value={loginForm.values.password}
                  autoComplete="current-password"
                  placeholder='A123'
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6"
                />
              </div>
              {loginForm.errors.password && loginForm.touched.password && <p className='text-red-500 mt-2'>{loginForm.errors.password}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="disabled:opacity-60 flex w-full justify-center rounded-md bg-[#005dcb] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                disabled={!(loginForm.isValid && loginForm.dirty)}
              >
                {isLoading ? <FaSpinner className='text-xl icon-spin' /> : "Sign in"}
              </button>
              <button
                onClick={loginForm.resetForm}
                type='reset' className='mt-3 flex w-full justify-center rounded-md bg-red-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm'>
                Clear Inputs
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link to={"/register"} className="font-semibold leading-6 text-[#005dcb] hover:text-indigo-500">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login