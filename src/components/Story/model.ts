import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import {MongooseAutoIncrementID , PluginOptions} from "mongoose-auto-increment-reworked";
import CodeUtils from '../../config/utils/CodeUtils'
/**
 * @export
 * @interface IStoryModel
 * @extends {Document}
 */
export interface IStoryModel extends Document {
    story_id : {type : number , default : 0},
    user_id : {type : string},
    title : {type : string},
    content : {type : string},
    cate_id : {type : string},
    file : {type : string},
    tag : Array<string>,
    related_content : Array<Map<string,string>>,
    visible : {type: string}
}

/**
 *  StorySchema
 * 
 *  story_id : 고유 id (ex : 0)
 *  user_id : user_id (ex : 0)
 *  title : 제목 (ex : 'TEST')
 *  content : 내용 (ex : 'TEST')
 *  cate_id : 카테고리 id (ex : '0')
 *  file : 파일 명 (ex : 'TEST.png')
 *  tag : 태그 id 리스트 (ex : [1,2,3,4,5])
 *  related_content : 관계된 내용입력 ex) (TEST -> "http:local.test.io")
 */
const storySchema: Schema = new Schema({
    story_id : {type : Number , default : 0},
    user_id : {type : String},
    title : {type : String},
    content : {type : String},
    cate_id : {type : String},
    file : {type : String},
    tag : Array,
    related_content : Array,
    visible : {type: String , default : CodeUtils.VISIBLE_Y}
}, {
    collection: 'story',
    versionKey: false,
    timestamps : true
})

const options: any = {
    field: "story_id", 
    incrementBy: 1,
    nextCount: false, 
    resetCount: "reset", 
    startAt: 1,
    unique: true
  };
  
const plugin = new MongooseAutoIncrementID(storySchema, "Story",options);
   
plugin.applyPlugin();

export default connections.db.model < IStoryModel > ('Story', storySchema);
