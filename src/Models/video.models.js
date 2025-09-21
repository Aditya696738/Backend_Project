import mongoose , {Schema} from "mongoose"

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema({
    videoFile:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    thumbNail:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    views:{
         type:Number,
        required:true,
        default:0
    },
    isPublished:{
         type:Boolean,
        required:true,
        default:true
    },
    videoOwner:[
        {
            type:Schema.Types.ObjectId,
            ref:"user"
        }
    ]
} , {timestamps:true});


videoSchema.plugin(mongooseAggregatePaginate);
export const video = mongoose.model("video" , videoSchema)