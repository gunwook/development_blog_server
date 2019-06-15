
import StoryService from './service';
import { HttpError } from '../../config/error';
import { IStoryModel } from './model';
import { NextFunction, Request, Response } from 'express';
import {makeUploadResult} from '../../config/utils/commonUtils'

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function insertToStory(req : Request, res : Response , next : NextFunction) {
    try {

        // user_id 삽입
        req.body.user_id = String(req.user._id)

        const users: IStoryModel = await StoryService.insert(req);

        res.status(200).json(users);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
/**
 * @exports
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >} 
 */
export async function find(req : Request , res : Response , next : NextFunction){
    try {
        const users : IStoryModel[] = await StoryService.find(req.query.story_id);
        
        res.status(200).json(users)
    } catch (error) {
        next(new HttpError(error.message.status,error.message))
    }
}



/**
 * @exports
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function upload(req : Request , res : Response , next : NextFunction){
    try {
        let data = [].concat(req.files);
        let image : Array<string> = []
        
        for (let entry of data) {
            if(entry.original.key) image.push(entry.original.key)
        }

        res.status(200).json(makeUploadResult(image))
    } catch (error) {
        next(new HttpError(error.message.status,error.message))
    }
}

