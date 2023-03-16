import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../assets/Profile.png";
import styles from "../styles/Username.module.css";
import { validateOTPCode } from "../helper/validate";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useStateValue } from "../Context/appContext";

const validate = (values) => {
  const errors = {};
  if(!values.username){
    errors.username = toast.error("provide username")
  }else if(!values.password){
    errors.password = toast.error("provide password")
  }

}
const Login = () => {
  const {state, dispatch} = useStateValue()
  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validate,

    // validate only when you clcik on submit btn
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));

      dispatch({type: 'SET_USER', })
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder="false"></Toaster>
      <div className="flex h-screen justify-center items-center">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Login</h4>
            <span className="py-4 text-xl w-3/4 text-center text-gray-500"></span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="textbox py-4 flex flex-col justify-center items-center gap-6">
              <span className="text-sm text-gray-500 text-left">
                Enter crendential to login
              </span>
              <input
                type="text"
                name="username"
                id="username"
                className={styles.textbox}
                placeholder="Username"
                {...formik.getFieldProps("username")}
              />
              <input
                type="password"
                name="password"
                id="password"
                className={styles.textbox}
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <button type="submit" className="btn">
                Sign In
              </button>
            </div>

            <div className="text-center my-4">
              <span className="text-xl text-gray-500">
                Don't have an account?{" "}
                <Link className="text-red-500" to="/register">
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
