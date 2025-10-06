import asyncHandler from "../Utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "../Models/user.models";
import APIerror from "../Utils/APIerror";


export const verifyJWT = asyncHandler(async(req , res , next) => {
    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "");
        if(!token){
            throw new APIerror(401 , "authorization was failed");
        }

        const decodedInfo = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedInfo?._id).select("-password -refreshToken")

        if(!user){
            throw new APIerror(401 , "Invalid access Token");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new APIerror(401 , error?.mesage || "Invalid Access Token");
    }
})