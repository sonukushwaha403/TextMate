import express from "express";
import { login,logout,register, refreshToken } from "../controllers/auth.controller.js";
import trimRequest from "trim-request";

const router = express.Router();

router.route("/register").post(trimRequest.all,register);
router.route("/login").post(trimRequest.all,login);
router.route("/logout").post(trimRequest.all,logout);
router.route("/refreshtoken").post(trimRequest.all,refreshToken);
router.route("/testingauthMiddleware").get(trimRequest.all,(req,res)=>{
    res.send('hello');
});

export default router;

 