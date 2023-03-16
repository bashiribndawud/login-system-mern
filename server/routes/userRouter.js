import { Router } from "express";
const router = Router();
import * as controller from "../controller/appcontroller.js"
import {registerMail} from "../controller/sendMail.js"
import {
  isAuthenticated,
  localVariable,
  verifyUser,
} from "../middleware/auth.js";
// Get Method


router.post("/registerMail", registerMail);
router
  .route("/generateOTP")
  .get(verifyUser, localVariable, controller.generateOTP);

router.get("/verifyOTP", verifyUser, controller.verifyOTP);
router.get("/createResetSession", controller.createResetSession);
router.get("/:username", controller.getUser);

router.put("/updateuser", controller.updateUser);
router.put("/resetPassword", verifyUser, controller.resetPassword);


export default router;
