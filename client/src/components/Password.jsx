import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../assets/Profile.png";
import styles from "../styles/Username.module.css";
import { validatePassword } from "../helper/validate";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useStateValue } from "../Context/appContext.js";
import useFetch from "../hooks/fetchHook.js";
import { verifyPassword } from "../helper/helpers";
import { useNavigate } from "react-router-dom";
const Password = () => {
  const navigate = useNavigate();
  const {
    state: { username },
  } = useStateValue();

  // const [{ isLoading, apiData, serverError }] = useFetch(
  //   `v1/user/${username}`
  // );

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: validatePassword,

    // validate only when you clcik on submit btn
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
     
      let loginPromise = verifyPassword({username, password: values.password});
      toast.promise({
        loading: "Checking...",
        success: <b>Login Successful...</b>,
        error: <b>Password not match</b>,
      });

      loginPromise.then(res => {
        let {token} = res.data
        localStorage.setItem('token', token)
        navigate("/profile")
      })
    },
  });

  // if(isLoading){
  //   return <h1 className="text-2xl font-bold">Loading</h1>
  // }

  // if(serverError) return <h1 className="text-xl text-red-500">{serverError.message}</h1>

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder="false"></Toaster>
      <div className="flex h-screen justify-center items-center">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Hello {username} </h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us {username}
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={ Avatar} alt="Avatar" className={styles.profile_img} />
            </div>

            <div className="textbox flex flex-col justify-center items-center gap-6">
              <input
                type="password"
                name="password"
                id="password"
                className={styles.textbox}
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <button type="submit" className="btn">
                Let's Go
              </button>
            </div>

            <div className="text-center my-4">
              <span className="text-xl text-gray-500">
                Forget Password?{" "}
                <Link className="text-red-500" to="/recovery">
                  Recovery Password!
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
