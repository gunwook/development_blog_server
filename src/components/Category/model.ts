import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
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
    cate_id : number,
    user_id : string
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
    cate_id : {type : Number , default : 0 , unique : true},
    user_id : {type : String , index : true},
    cate_value : {type : String},
    visible : {type: String , default : CodeUtils.VISIBLE_Y}
}, {
    collection: 'category',
    versionKey: false,
    timestamps : true
})


cateSchema.set('toObject', {
    transform: (doc : any, ret : any) => {
        delete ret._id;
        return ret;
    },
});
const options: PluginOptions = {
    field: "cate_id", 
    incrementBy: 1,
    nextCount: false, 
    resetCount: "reset", 
    startAt: 1,
    unique: true
  };
  
  const plugin = new MongooseAutoIncrementID(cateSchema, "CateGory",options);
   
  plugin.applyPlugin();

export default mongoose.model < ICateGoryModel > ('CateGory', cateSchema);
