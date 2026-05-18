import { Router } from "express";
import {isLoggedIn} from "../middleware/login.protected.middleware.js"
const userRouter = Router()


import{ RegisterAPI }from "../controllers/user.register.js"
userRouter.post("/register",RegisterAPI)

import { LoginAPI } from "../controllers/user.login.js";
userRouter.post("/login",LoginAPI)

import { LogoutAPI } from "../controllers/user.logout.js";
userRouter.post("/logout",isLoggedIn,LogoutAPI)

import { CreateShortUrl, GetMyUrls, DeleteShortUrl } from "../controllers/url.shortnerAPI.js";
userRouter.post("/shortURL", isLoggedIn, CreateShortUrl);
userRouter.get("/myURLs", isLoggedIn, GetMyUrls);
userRouter.delete("/shortURL/:shortCode", isLoggedIn, DeleteShortUrl);

export default userRouter;