import {Router} from "express";
import {registerUser , loginUser, logOutUser } from "../Controllers/user.controller.js";
import upload from "../Middleware/multer.middleware.js"
const router = Router()

router.route("/register").post( upload.fields([
    {
        name : "avatar",
        maxCount : 1
    } , 

    {
        name : "coverImage",
        maxCount : 1
    }
    
]) , registerUser);

//login route
router.route("/login").post(loginUser);

//logout route
router.route("/logout").post(logOutUser);

export default router;