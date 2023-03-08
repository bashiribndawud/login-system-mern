import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../assets/Profile.png";
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { validateResetPassword } from "../helper/validate";
const Reset = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validate: validateResetPassword,

    // validate only when you clcik on submit btn
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder="false"></Toaster>
      <div className="flex h-screen justify-center items-center">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">New Password</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col justify-center items-center gap-6">
              <input
                type="password"
                name="password"
                className={styles.textbox}
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <input
                type="password"
                name="confirm-password"
                className={styles.textbox}
                placeholder="Confirm Password"
                {...formik.getFieldProps("confirm_password")}
              />
              <button type="submit" className="btn">
                Let's Go
              </button>
            </div>

            {/* <div className="text-center my-4">
              <span className="text-xl text-gray-500">
                Forget Password?{" "}
                <Link className="text-red-500" to="/recovery">
                  Recovery Password!
                </Link>
              </span>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
