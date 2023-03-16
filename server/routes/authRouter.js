import { Router } from "express";
const router = Router();
import * as controller from "../controller/appcontroller.js";
import { isAuthenticated } from "../middleware/auth.js";

router.post("/register", controller.register);
// router.post("/registermail", (req, res) => []);
router.post("/authenticate", (req, res) => {
  res.end();
});
router.post("/login", controller.login);

export default router;