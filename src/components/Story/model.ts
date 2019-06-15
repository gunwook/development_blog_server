import { Document, Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import {MongooseAutoIncrementID , PluginOptions} from "mongoose-auto-increment-reworked";
import CodeUtils from '../../config/utils/CodeUtils'
/**
 * @export
 * @interface IStoryModel
 * @extends {Document}
 */
export interface IStoryModel extends Document {
    story_id :number,
    user_id : string,
    title : string,
    content : string,
    cate_id : string,
    tag : Array<string>,
    related_content : Array<Map<string,string>>,
    visible :string
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
    story_id : {type : Number , default : 0 , unique : true , index : true},
    user_id : {type : String},
    title : {type : String},
    content : {type : String},
    cate_id : {type : String},
    tag : {type : Array},
    related_content : {type : Array},
    visible : {type: String , default : CodeUtils.VISIBLE_Y , trim: true }
}, {
    collection: 'storymodel',
    versionKey: false,
    timestamps : true
})

const options: PluginOptions = {
    field: "story_id", 
    incrementBy: 1,
    nextCount: false, 
    resetCount: "reset", 
    startAt: 1,
    unique: true
  };

storySchema.set('toObject', {
transform: (doc : any, ret : any) => {
    delete ret._id;
    return ret;
},
});

  
const plugin = new MongooseAutoIncrementID(storySchema, "StoryModel",options);
   
plugin.applyPlugin();

export default mongoose.model < IStoryModel > ('StoryModel', storySchema);
