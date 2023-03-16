import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../assets/Profile.png";
import styles from "../styles/Username.module.css";
import { validatePassword } from "../helper/validate";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import convertToBase64 from "../helper/convert";
import extend from "../styles/Profile.module.css";
import { useStateValue } from "../Context/appContext";
import useFetch from "../hooks/fetchHook.js"
import {updateUser} from "../helper/helpers"
const validate = (values) => {
  
  const errors = {};
  if (values.email) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = toast.error("Invalid Email");
    }
  }

  return errors;
};
const Profile = () => {
  const navigate = useNavigate()
  const [{ isloading, apiData, serverError }] = useFetch();
  
  const [image, setImage] = useState(null);
  const formik = useFormik({
    initialValues: {
      firstname: apiData?.firstName || '',
      lastname: apiData?.lastName || '',
      address: apiData?.address || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
    },
    enableReinitialize: true,
    validate,
    // validate only when you clcik on submit btn
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      // formik does not support file upload so we are adding it manually
      values = await Object.assign(values, { profile: image || apiData?.profile || "" });
      let updateUserPromise = updateUser(values);
      toast.promise(updateUserPromise, {
        loading: 'Updating...',
        success: <b>Update successful...</b>,
        error: <b>Could not update user</b>
      })
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setImage(base64);
  };
  // if(isloading) return <h1 className="text-xl">Loading...</h1>
  // if(serverError) return <h1 className="text-xl text-red-500">{serverError.message}</h1>
  function userLogOut(){
    localStorage.removeItem('token');
    navigate("/")
  }
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder="false"></Toaster>
      <div className="flex h-screen justify-center items-center">
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "45%", paddingTop: "3rem" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <label htmlFor="profile">
              <div className="profile flex justify-center py-4">
                <img
                  src={apiData?.profile || image || Avatar}
                  alt="Avatar"
                  className={`${styles.profile_img} ${extend.profile_img}`}
                />
              </div>

              <input
                onChange={onUpload}
                type="file"
                name="profile"
                id="profile"
              />
            </label>

            <div className="textbox flex flex-col justify-center items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className={`${styles.textbox} ${extend.textbox}`}
                  placeholder="First_Name"
                  {...formik.getFieldProps("firstname")}
                />
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className={`${styles.textbox} ${extend.textbox}`}
                  placeholder="Last_Name"
                  {...formik.getFieldProps("lastname")}
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`${styles.textbox} ${extend.textbox}`}
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                />
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  className={`${styles.textbox} ${extend.textbox}`}
                  placeholder="Mobile"
                  {...formik.getFieldProps("mobile")}
                />
              </div>
              <div className="name flex w-3/4 gap-10 ">
                <input
                  type="text"
                  name="address"
                  id="address"
                  className={`${styles.textbox} ${extend.textbox}`}
                  placeholder="Address"
                  {...formik.getFieldProps("address")}
                  style={{ flex: 1 }}
                />
              </div>

              <button type="submit" className="btn">
                Update
              </button>

              <div className="text-center my-4">
                <span className="text-xl text-gray-500">
                  come back later?{" "}
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={userLogOut}
                  >
                    logout!
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
