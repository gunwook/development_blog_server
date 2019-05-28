import LikeService from './service';
import { HttpError } from '../../config/error';
import { ILikeModel } from './model';
import { NextFunction, Request, Response } from 'express';

/**
 * @export
 * @param {ILikeModel} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function save(req : Request, res : Response , next : NextFunction) {
    try {
        // user_id 삽입
        req.body.user_id = String(req.user._id)
        
        const users: ILikeModel = await LikeService.insert(req.body);

        res.status(200).json(users.toObject());
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
        const users : ILikeModel[] = await LikeService.find(req.query.story_id);
        
        res.status(200).json(users)
    } catch (error) {
        next(new HttpError(error.message.status,error.message))
    }
}