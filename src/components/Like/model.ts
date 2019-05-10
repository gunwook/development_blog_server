import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import {MongooseAutoIncrementID , PluginOptions} from "mongoose-auto-increment-reworked";
import CodeUtils from '../../config/utils/CodeUtils'
/**
 * @export
 * @interface ILikeModel
 * @extends {Document}
 */
export interface ILikeModel extends Document {
    like_id : {type : Number , default : 0},
    user_id : {type : String},
    story_id : {type : String},
    is_like_yn : {type: String}
}

/**
 *  LikeSchema
 * 
 *  like_id : 고유 id (ex : 0)
 *  user_id : user_id
 *  story_id : story_id
 *  is_like_yn : 보여지는지 여부 (ex : "y" , "n")
 */
const likeSchema: Schema = new Schema({
    like_id : {type : Number , default : 0},
    user_id : {type : String},
    story_id : {type : String},
    is_like_yn : {type: String , default : CodeUtils.VISIBLE_Y}
}, {
    collection: 'like',
    versionKey: false,
    timestamps : true
})

const options: any = {
    field: "like_id", 
    incrementBy: 1,
    nextCount: false, 
    resetCount: "reset", 
    startAt: 1,
    unique: true
};
  
const plugin = new MongooseAutoIncrementID(likeSchema, "Like",options);
   
plugin.applyPlugin();

export default connections.db.model < ILikeModel > ('Like', likeSchema);
