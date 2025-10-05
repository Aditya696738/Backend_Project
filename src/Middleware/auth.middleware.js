import asyncHandler from "../Utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "../Models/user.models";
import APIerror from "../Utils/APIerror";


export const verifyJWT = asyncHandler(async(req ,res) => {
    
})