
import StoryService from './service';
import { HttpError } from '../../config/error';
import { IStoryModel } from './model';
import { NextFunction, Request, Response } from 'express';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function insertToStory(req : Request, res : Response , next : NextFunction) {
    try {
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