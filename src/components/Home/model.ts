import { Document, Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import {MongooseAutoIncrementID , PluginOptions} from "mongoose-auto-increment-reworked";
import { NextFunction, Request, Response } from 'express';
import CodeUtils from '../../config/utils/CodeUtils'

/**
 * @export
 * @interface IHomeModel
 * @extends {Document}
 */
export interface IHomeModel extends Document {
    user_id : string,
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
 *  title : 제목
 *  subtitle : 서브 제목
 *  conts : 내용
 *  image : 유저 이미지
 *  wisesaying : 한줄 소개
 *  visible : 보여지는지 여부
 */
const homeSchema: Schema = new Schema({
    user_id : {type : String , required : true, unique : true, index : true},
    title : {type : String},
    subtitle : {type : String},
    conts : {type : String},
    image : {type : Array},
    wisesaying : {type : String},
    visible : {type: String , default : CodeUtils.VISIBLE_Y}
}, {
    collection: 'homemodel', versionKey: false, timestamps: { createdAt: 'created_at' }
})

homeSchema.set('toObject', {
  transform: (doc : any, ret : any) => {
    delete ret._id;
    return ret;
  },
});
  
const plugin = new MongooseAutoIncrementID(homeSchema, "HomeModel");
   
plugin.applyPlugin();

export default mongoose.model < IHomeModel > ('HomeModel', homeSchema);
