import mongoose, { model, models, Mongoose, Schema } from "mongoose";

export const VIDEO_DIMENSION = {
    height:1920,
    width:1080,

} as const

export interface IVideo {
_id:mongoose.Types.ObjectId,
title:string,
description:string,
videoUrl:string,
thumbnailUrl:string,
controls:boolean,
transformation?:{
    height:number,
    width:number,
    quality?:number
}
}

const videoSchema = new Schema<IVideo>(
    {
        title:{type:String, required:true},
        description:{type:String,required:true},
        videoUrl:{type:String,required: true},
        controls:{type:Boolean,default:true},
        thumbnailUrl:{type:String,required:true},
        transformation:{
            width:{type:Number,default:VIDEO_DIMENSION},
            height:{type:Number,default:VIDEO_DIMENSION},
            quality:{type:Number,default:VIDEO_DIMENSION}
        },


    },
    {
        timestamps:true
    }
)

const Video = models?.Video || model<IVideo>("video", videoSchema),

export default Video
