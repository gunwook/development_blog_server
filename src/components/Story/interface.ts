import { IStoryModel } from './model';
import { NextFunction, Request, Response } from 'express';
/**
 * @export
 * @interface IStoryService
 */
export interface IStoryService {


    /**
     * @param {string} id
     * @returns {Promise<IStoryModel>}
     * @memberof IStoryService
     */
    find(id: string): Promise<IStoryModel[]>;

    /**
     * @param {Request} request
     * @returns {Promise<IStoryModel>}
     * @memberof IStoryService
     */
    insert(request: Request): Promise<IStoryModel>;

    /**
     * @param {string} id
     * @returns {Promise<IStoryModel>}
     * @memberof IStoryService
     */
    remove(id: string): Promise<IStoryModel>;

}
