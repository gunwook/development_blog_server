import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
import {MongooseAutoIncrementID , PluginOptions} from "mongoose-auto-increment-reworked";
import CodeUtils from '../../config/utils/CodeUtils'
/**
 * @export
 * @interface ICateGoryModel
 * @extends {Document}
 */
export interface ICateGoryModel extends Document {
    cate_id : {type : number , default : 0},
    user_id : {type : string}
    cate_value : string,
    visible : string
}

/**
 *  CateSchema
 * 
 *  cate_id : 고유 id (ex : 0)
 *  cate_value : 상위 카테고리 value (ex : "TEST")
 *  cate_sub_value : 하위 카테고리 value (ex : [{"TEST" => "TEST"}])
 *  visible : 보여지는지 여부 (ex : "y" , "n")
 */
const cateSchema: Schema = new Schema({
    cate_id : {type : Number , default : 0},
    user_id : String,
    cate_value : String,
    visible : {type: String , default : CodeUtils.VISIBLE_Y}
}, {
    collection: 'category',
    versionKey: false,
    timestamps : true
})

const options: any = {
    field: "cate_id", 
    incrementBy: 1,
    nextCount: false, 
    resetCount: "reset", 
    startAt: 1,
    unique: true
  };
  
  const plugin = new MongooseAutoIncrementID(cateSchema, "CateGory",options);
   
  plugin.applyPlugin();

export default connections.db.model < ICateGoryModel > ('CateGory', cateSchema);
