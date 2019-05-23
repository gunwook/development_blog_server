import { Document, Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import {MongooseAutoIncrementID , PluginOptions} from "mongoose-auto-increment-reworked";
import { NextFunction, Request, Response } from 'express';
/**
 * @export
 * @interface IHomeModel
 * @extends {Document}
 */
export interface IHomeModel extends Document {
    user_id : string,
    home_id : number,
    backgroundimage : string,
    title : string,
    subtitle : string,
    conts : string,
    image : Array<string>,
    wisesaying : string,
    visible : string
}

/**
 *  HomeSchema
 * 
 *  user_id : user_id (ex : 0)
 *  home_id : 고유 id (ex : 0)
 *  backgroundimage : 배경이미지
 *  title : 제목
 *  subtitle : 서브 제목
 *  conts : 내용
 *  image : 유저 이미지
 *  wisesaying : 한줄 소개
 *  visible : 보여지는지 여부
 */
const homeSchema: Schema = new Schema({
    user_id : {type : String , required : true},
    home_id : {type : Number , unique : true , index : true},
    backgroundimage : {type : String},
    title : {type : String},
    subtitle : {type : String},
    conts : {type : String},
    image : {type : Array},
    wisesaying : {type : String},
    visible : {type : String}
}, {
    collection: 'homemodel', versionKey: false, timestamps: { createdAt: 'created_at' }
})
const options: PluginOptions = {
    field: "home_id", 
    incrementBy: 1,
    nextCount: false, 
    resetCount: "reset", 
    startAt: 1,
    unique: true
  };

homeSchema.set('toObject', {
  transform: (doc : any, ret : any) => {
    delete ret._id;
    return ret;
  },
});
  
const plugin = new MongooseAutoIncrementID(homeSchema, "HomeModel",options);
   
plugin.applyPlugin();

export default mongoose.model < IHomeModel > ('HomeModel', homeSchema);
