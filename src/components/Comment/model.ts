import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';
import {MongooseAutoIncrementID , PluginOptions} from "mongoose-auto-increment-reworked";
import CodeUtils from '../../config/utils/CodeUtils'
/**
 * @export
 * @interface ICommentModel
 * @extends {Document}
 */
export interface ICommentModel extends Document {
    comment_id : number,
    user_id : string,
    story_id : string,
    content : string,
    visible : string,
}

/**
 *  CommentSchema
 * 
 *  comment_id : 고유 id (ex : 0)
 *  user_id : user_id
 *  story_id : story_id
 *  content : 내용 (ex : "TEST")
 *  visible : 보여지는지 여부 (ex : "y" , "n")
 */
const commentSchema: Schema = new Schema({
    comment_id : {type : Number , default : 0},
    user_id : {type : String , required : true},
    story_id : {type : String , required : true , index : true},
    content : {type : String},
    visible : {type: String , default : CodeUtils.VISIBLE_Y}
}, {
    collection: 'comment',
    versionKey: false,
    timestamps : true
})

const options: any = {
    field: "comment_id", 
    incrementBy: 1,
    nextCount: false, 
    resetCount: "reset", 
    startAt: 1,
    unique: true
};
  
const plugin = new MongooseAutoIncrementID(commentSchema, "Comment",options);
   
plugin.applyPlugin();

export default mongoose.model < ICommentModel > ('Comment', commentSchema);
