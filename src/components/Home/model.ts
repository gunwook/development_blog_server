import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import {MongooseAutoIncrementID , PluginOptions} from "mongoose-auto-increment-reworked";
import CodeUtils from '../../config/utils/CodeUtils'
/**
 * @export
 * @interface IHomeModel
 * @extends {Document}
 */
export interface IHomeModel extends Document {
    user_id : {type : string},
    home_id : {type : string},
    backgroundimage : {type : string},
    title : {type : string},
    subtitle : {type : string},
    conts : {type : string},
    image : {type : string},
    wisesaying : {type : string},
    visible : {type : string}
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
    home_id : {type : String, required : true , index : true},
    backgroundimage : {type : String},
    title : {type : String},
    subtitle : {type : String},
    conts : {type : String},
    image : {type : String},
    wisesaying : {type : String},
    visible : {type : String}
}, {
    collection: 'home',
    versionKey: false,
    timestamps : true
})

const options: any = {
    field: "home_id", 
    incrementBy: 1,
    nextCount: false, 
    resetCount: "reset", 
    startAt: 1,
    unique: true
  };
  
const plugin = new MongooseAutoIncrementID(homeSchema, "Home",options);
   
plugin.applyPlugin();

export default connections.db.model < IHomeModel > ('Home', homeSchema);
