import mongoose , {Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new Schema({

    userName:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        trim:true,
        index:true // for enable searching
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:[true , "Please enter a Password"],
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true 
    },
    avatar:{
        type:String,
        required:true,
        unique:true,
    },
    coverImage:{
        type:String,
        required:true,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"video"
        }
    ],
    refreshToken:{
        type:String,
    }

} , {timestamps:true});

userSchema.pre("save" , async function(next){

    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password , 10)
    next();
})

// for checking password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}

// token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            userName:this.userName,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const user = mongoose.model("user" , userSchema)