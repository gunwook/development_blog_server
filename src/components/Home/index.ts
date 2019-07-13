
import HomeService from './service';
import { HttpError } from '../../config/error';
import { IHomeModel } from './model';
import { NextFunction, Request, Response } from 'express';
import {makeUploadResult} from '../../config/utils/commonUtils'
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function insertToHome(req : Request, res : Response , next : NextFunction) {
    try {
         // user_id 삽입
         req.body.user_id = String(req.user._id)

        const users: IHomeModel = await HomeService.insert(req);

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
        
        const users : IHomeModel = await HomeService.find(String(req.user._id));
       
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
       // user_id 삽입
        req.body.user_id = String(req.user._id)

        const users : IHomeModel = await HomeService.upload(req);
        
        res.status(200).json(users)
    } catch (error) {
        next(new HttpError(error.message.status,error.message))
    }
}