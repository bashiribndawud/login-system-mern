import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../assets/Profile.png";
import styles from "../styles/Username.module.css";
import { validateOTPCode } from "../helper/validate";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";

const Recovery = () => {
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validate: validateOTPCode,

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
            <h4 className="text-3xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-3/4 text-center text-gray-500">
              Enter OTP to recover password
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="textbox py-4 flex flex-col justify-center items-center gap-6">
              <span className="text-sm text-gray-500 text-left">
                Enter 6 digit OTP sent to your email
              </span>
              <input
                type="text"
                name="otp"
                id="otp"
                className={styles.textbox}
                placeholder="OTP"
                {...formik.getFieldProps("otp")}
              />
              <button type="submit" className="btn">
                Let's Go
              </button>
            </div>

            <div className="text-center my-4">
              <span className="text-xl text-gray-500">
                Did not get OTP?{" "}
                <button className="text-red-500" type="button">
                  Resend!
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
