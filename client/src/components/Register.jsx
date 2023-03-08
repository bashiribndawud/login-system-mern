import React, {useState} from "react";
import { Link } from "react-router-dom";
import Avatar from "../assets/Profile.png";
import styles from "../styles/Username.module.css";
import { validatePassword } from "../helper/validate";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import convertToBase64 from "../helper/convert";

const validate = values => {
  const errors = {}
  if(!values.email){
    errors.email = toast.error("Email Required")
  }else if(!values.username){
    errors.username = toast.error("Username Required")
  }else if(!values.password){
    errors.password = toast.error("Password Required")
  }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
}
const Register = () => {
  const [image, setImage] = useState(null)
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate,
    // validate only when you clcik on submit btn
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      // formik does not support file upload so we are adding it manually
      values = await Object.assign(values, {profile: image || ""});
      console.log(values);
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0])
    setImage(base64)
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder="false"></Toaster>
      <div className="flex h-screen justify-center items-center">
        <div className={styles.glass} style={{ width: "45%", paddingTop: "3rem"}}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <label htmlFor="profile">
              <div className="profile flex justify-center py-4">
                <img src={image || Avatar} alt="Avatar" className={styles.profile_img} />
              </div>

              <input onChange={onUpload} type="file" name="profile" id="profile" />
            </label>

            <div className="textbox flex flex-col justify-center items-center gap-6">
              <input
                type="email"
                name="email"
                id="email"
                className={styles.textbox}
                placeholder="Email*"
                {...formik.getFieldProps("email")}
              />
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
                Let's Go
              </button>
            </div>

            <div className="text-center my-4">
              <span className="text-xl text-gray-500">
                Have an account?{" "}
                <Link className="text-red-500" to="/login">
                  Login!
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
