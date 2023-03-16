import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../assets/Profile.png";
import styles from "../styles/Username.module.css";
import { validateOTPCode } from "../helper/validate";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import {useStateValue} from "../Context/appContext";
import {generateOTP, verifyOTP} from "../helper/helpers"
import { useNavigate } from "react-router-dom";

const Recovery = () => {
  const navigate = useNavigate()
  const {state: {username}} = useStateValue();
  const [OTP, setOTP] = useState();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      if(OTP) return toast.success('OTP has been sent to your email');
      console.log(OTP);
      return toast.error("Cannot send OTP")
    })
  }, [username])
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validate: validateOTPCode,

    // validate only when you clcik on submit btn
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
     try {
      const { status, msg } = await verifyOTP({ username, code: OTP });

      if (status === 201) {
        toast.success(msg);
        navigate("/reset");
      }
      
     } catch (error) {
        return toast.error("Wrong OTP check email again");
     }
    },
  });

  function resendOTP() {
    let sendPromise = generateOTP(username);
    toast.promise(sendPromise, {
      loading: 'Sending...',
      success: <b>OTP code sent</b>,
      error: <b>cannot send OYP now!</b>
    })
    // await generateOTP(username).then(() => toast.success("OTP code resend to your email"))
  }
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder="false"></Toaster>
      <div className="flex h-screen justify-center items-center">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Recovery</h4>
            <span
              className="py-4 text-xl w-3/4 text-center text-gray-500"
              onChange={(e) => setOTP(e.target.value)}
            >
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
          </form>
          <div className="text-center my-4">
            <span className="text-xl text-gray-500">
              Did not get OTP?{" "}
              <button
                className="text-red-500"
                type="button"
                onClick={resendOTP}
              >
                Resend!
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
