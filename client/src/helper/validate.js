import toast, { Toaster } from "react-hot-toast";


export async function validateUsername(values){
    const error = userNameVerify({}, values)

    return error
}

export async function validatePassword(values){
    const errors = verifyPassword({}, values)

    return errors
}

export async function validateResetPassword(values) {
  const error = verifyPassword({}, values);
  if (!values.password !== values.confirm_password) {
    error.exist = toast.error("Password not match!!!");
  }

  return error;
}

export async function validateOTPCode(values) {
    const errors = {}
    if(!values.otp){
        errors.otp = toast.error("OTP Code Required")
    }else if (
      values.otp.length < 6 ||
      values.otp.includes(" ") ||
      values.otp.length > 6
    ) {
      errors.otp = toast.error("Invalid OTP");
    }
    return errors
}

function verifyPassword(errors={}, values){
  // Minimum eight characters, at least one letter, one number and one special character:
  const specialChar =
    "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$";
  if (!values.password) {
    errors.password = toast.error("Password Required...");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Invalid Password");
  } else if (values.password.length < 4) {
    errors.password = toast.error("Password must be greater than 4 chars");
  } else if (!specialChar.test(values.password)) {
    errors.password = toast.error("Passsword must contain special character");
  }

  return errors
}


// verify username
function userNameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required...")
  }else if(values.username.includes(" ")){
    error.username = toast.error("Invalid username")
  }

  return error
}

export {userNameVerify}
