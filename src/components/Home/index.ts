
import HomeService from './service';
import { HttpError } from '../../config/error';
import { IHomeModel } from './model';
import { NextFunction, Request, Response } from 'express';


/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function insertToHome(req : Request, res : Response , next : NextFunction) {
    try {
        const users: IHomeModel = await HomeService.insert(req.body);

        res.status(200).json(users);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}