import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
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
    cate_body_id : number,
    cate_id : number,
    cate_value : string,
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
    cate_body_id : {type : Number , unique : true},
    cate_id : {type : Number , default : 0 , index : true},
    cate_value : {type : String},
    visible : {type: String , default : CodeUtils.VISIBLE_Y}
}, {
    collection: 'categorybody',
    versionKey: false,
    timestamps : true
})

const options: PluginOptions = {
    field: "cate_body_id", // user_id will have an auto-incrementing value
    incrementBy: 1, // incremented by 2 every time
    nextCount: false, // Not interested in getting the next count - don't add it to the model
    resetCount: "reset", // The model and each document can now reset the counter via the reset() method
    startAt: 1, // Start the counter at 1000
    unique: true // Don't add a unique index
  };
  

  
cateSchema.set('toObject', {
    transform: (doc : any, ret : any) => {
        delete ret._id;
        return ret;
    },
});


const plugin = new MongooseAutoIncrementID(cateSchema, "CateGoryBody",options);
   
plugin.applyPlugin();

export default mongoose.model < ICateGoryBodyModel > ('CateGoryBody', cateSchema);
