
import CateBodyService from './service';
import { HttpError } from '../../config/error';
import { ICateGoryBodyModel } from './model';
import { NextFunction, Request, Response } from 'express';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function save(req : Request, res : Response , next : NextFunction) {
    try {
        const users: ICateGoryBodyModel = await CateBodyService.insert(req);

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
        const users : ICateGoryBodyModel = await CateBodyService.find(req.query.cate_id);
        
        res.status(200).json(users)
    } catch (error) {
        next(new HttpError(error.message.status,error.message))
    }
}