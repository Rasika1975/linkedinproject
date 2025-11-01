import express from 'express';
import { login,logOut,signUp } from '../controllers/auth.controller.js';

let authRouter = express.Router()
authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.get("/logOut",logOut)
export default authRouter;