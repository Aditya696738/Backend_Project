import asyncHandler from "../Utils/asyncHandler.js";
import APIerror from "../Utils/APIerror.js";
import { User } from "../Models/user.models.js";
import { ImageUpload } from "../Utils/Cloudinary.js";
import { APIresponse } from "../Utils/APIresponse.js";

const registerUser = asyncHandler(async (req , res) => {

    // example
    
   /* res.status(200).json({
        message: "Ok"
    }) */

        // real approach and code for registering a user
        /* 
        1. get user-details from frontend
        2. validation - not empty
        3. check if the user is exist or not by thier emial / username
        4. chk for images / avatar 
        5. upload them on cloudinary
        6. create user Object for entry in dataBase
        7. removed password and refresh token fields from response
        8. chk for user creation 
        9. return response
         */

        const {
            fullName, email , userName , password
        } = req.body

        //console.log(req.body);

       // console.log("email" , "username" , email , userName);

        if([ fullName, email , userName , password].some((field) => field?.trim() === "")
        ){
            throw new APIerror(404 , "fullNmae is required");
        }

        // calling and talking the database
        const existed_User = await User.findOne({
            $or : [{ userName } , { email }]
        })
        if(existed_User){
            throw new APIerror(409 , "user is already exist");
        }

        console.log(req.files);

        // by multer
        const local_avatar_Path = req.files?.avatar[0]?.path ;
        // checking
        if(!local_avatar_Path){
            throw new APIerror(404 , "Avatar file is required");
        }

        //const local_coverImage_Path = req.files?.coverImage[0]?.path ;

        let local_coverImage_Path;
        if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
            local_coverImage_Path = req.files.coverImage[0].path;
        }
 
       /* if(!local_coverImage_Path){
            throw new APIerror(404 , "coverImage file is required");
        } */

        
        const avatar = await ImageUpload(local_avatar_Path);
        if(!avatar){
            throw new APIerror();
        }

        const coverImage = await ImageUpload(local_coverImage_Path)
        

        // entry in dataBase
        const createdUser = await User.create({
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || " ",
            email,
            password,
            userName: userName
        });

        const userWithoutSensitiveFields = await User.findById(createdUser._id).select("-password -refreshToken");
        if(!userWithoutSensitiveFields){
            throw new APIerror(505 , "Something went wrong while registering");
        }
        return res.status(201).json(
            new APIresponse(200 , userWithoutSensitiveFields , "user registration succesfully")
        )
})

export default registerUser; 