import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from "../assets/Profile.png"
import styles from '../styles/Username.module.css'
import { validateUsername } from '../helper/validate';
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";



 const Username = () => {

    const formik = useFormik({
        initialValues: {
            username: ""
        },
        validate: validateUsername,

        // validate only when you clcik on submit btn
        validateOnBlur: false,
        validateOnChange: false,

        onSubmit: async values => {
            alert(JSON.stringify(values, null, 2));
        }
    })
   
  return (
    <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder="false"></Toaster>
      <div className="flex h-screen justify-center items-center">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Username</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={Avatar} alt="Avatar" className={styles.profile_img} />
            </div>

            <div className="textbox flex flex-col justify-center items-center gap-6">
              <input
                type="text"
                name="username"
                id="username"
                className={styles.textbox}
                placeholder="Username"
                {...formik.getFieldProps('username')}
              />
              <button type="submit" className="btn">
               Sign In
              </button>
            </div>

            <div className="text-center my-4">
              <span className="text-xl text-gray-500">
                Not a member{" "}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Username