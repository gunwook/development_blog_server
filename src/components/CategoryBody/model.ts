import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
import {MongooseAutoIncrementID , PluginOptions} from 'mongoose-auto-increment-reworked';
import CodeUtils from '../../config/utils/CodeUtils'
/**
 * @export
 * @interface ICateGory
 * @extends {Document}
 */
export interface ICateGoryBodyModel extends Document{
    cate_body_id : {type : number , default : 0},
    cate_id : {type : number , default : 0},
    cate_body_value : string,
    visible : string
}

/**
 *  CateSchema
 * 
 *  cate_id : 고유 id (ex : 0)
 *  cate_value : 상위 카테고리 value (ex : "TEST")
 *  cate_sub_value : 하위 카테고리 value (ex : [{"TEST" => "TEST"}])
 */
const cateSchema: Schema = new Schema({
    cate_id : {type : Number , default : 0},
    cate_value : String,
    cate_sub_value : Array,
    visible : {type: String , default : CodeUtils.VISIBLE_Y}
}, {
    collection: 'categorybody',
    versionKey: false,
    timestamps : true
})

const options: any = {
    field: "cate_body_id", // user_id will have an auto-incrementing value
    incrementBy: 1, // incremented by 2 every time
    nextCount: false, // Not interested in getting the next count - don't add it to the model
    resetCount: "reset", // The model and each document can now reset the counter via the reset() method
    startAt: 1, // Start the counter at 1000
    unique: true // Don't add a unique index
  };
  
const plugin = new MongooseAutoIncrementID(cateSchema, "CateGoryBody",options);
   
plugin.applyPlugin();

export default connections.db.model < ICateGoryBodyModel > ('CateGoryBody', cateSchema);
