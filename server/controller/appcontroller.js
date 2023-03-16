import { UserModel } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
dotenv.config();

export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    const userExist = await UserModel.findOne({ username });
    if (userExist) {
      return res.status(400).json({ msg: "Provide unique username" });
    }

    const emailExist = await UserModel.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ msg: "Provide unique email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      email,
      password: hashedPassword,
      username,
      profile: profile || "",
    });

    await newUser.save();
    return res.status(201).json({ msg: "User Created" });
  } catch (error) {
    return res.status(500).json(error);
  }
}


/** POST: http://localhost:8000/api/v1/auth/login
 *
 * @param {
 *      "username" : "bashirin",
 *      "password" : "admin1234"
 * } req 
 * @param {*} res 
 * @returns 
 */
export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const payload = { id: user._id };

    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: "12h",
    });

    const { password: userPassword, ...rest } = user._doc;

    return res.status(200).json({
      msg: "User logged In",
      userInfo: { ...rest },
      bearerToken: token,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export async function getUser(req, res) {
  const { username } = req.params;

  try {
     const user = await UserModel.findOne({ username });
     if (!user) {
       return res.status(404).json({ err: "Could not find user" });
     }
     const { password, ...rest } = user._doc;
     return res.status(200).json({ ...rest });
  } catch (error) {
    return res.status(500).json({ ...rest });
  }
}


/** POST: http://localhost:8000/api/v1/auth/updateUser
 *
 * @param {
 *      "id" : "<token>",
 * 
 * } 
 * body: {
 *      firstName: "",
 *      lastName: "",
 *      profile: ""
 * }
 * @param {*} res 
 * @returns 
 */
export async function updateUser(req, res) {
  const id = req.query.id;
  //   loggedIn User Id
  const { userId } = req.user;
  try {
    if (id) {
      const body = req.body;
      UserModel.updateOne({ _id: userId }, body, function (err, data) {
        if (err) throw err;
        return res.status(201).json({ msg: "Record updated..." });
      });
    }
  } catch (error) {
    return res.status(500).json({ err: "User not found" });
  }
}

export async function generateOTP(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    digits: true,
    specialChars: false,
  });

  const { email } = req.user;
  const existUser = await UserModel.findOne({ email });
  existUser.otp = req.app.locals.OTP;
  await existUser.save();

  return res.status(201).json({ code: existUser.otp });
}

export async function verifyOTP(req, res) {
  const { code } = req.query;
  const { user } = req.user;

  if (req.app.locals.OTP === code) {
    req.app.locals.OTP = null; //reset OTP value
    req.app.locals.resetSession = true; //start session for reset password

    return res.status(201).json({ msg: "Verify successful" });
  }
  return res.status(400).json({ msg: "Invalid OTP" });
}

// create session to resetPassword
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    return res.status(201).json({ flag: req.app.locals.resetSession });
  }
  return res.status(201).json({ msg: "Session Expired" });
}

export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).json({ error: "Session Expired" });
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.updateOne({ username }, { password: hashedPassword });
    req.app.locals.resetSession = false;
    await user.save();
    return res.status(200).json({ msg: "Password Reset success" });
  } catch (error) {
    return res.status(401).send({ error });
  }
}
