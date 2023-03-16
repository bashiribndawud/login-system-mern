import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";
import * as dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    // console.log(token)
    if (!token) {
      return res.status(404).json({ msg: "Token not found" });
    }

    const verifyToken = await jwt.verify(token, process.env.SECRET);
    if (!verifyToken) {
      return res.status(400).json({ msg: "Invalid token" });
    }

    const user = await UserModel.find(verifyToken._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export function localVariable(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };

  next();
}

export async function verifyUser(req, res, next) {
  const { username } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json(error.message);   
  }
 
}
