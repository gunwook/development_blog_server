import { ICateGoryModel } from './model';
import { NextFunction, Request, Response } from 'express';
/**
 * @export
 * @interface ICateService
 */
export interface ICateService {


    /**
     * @param {string} id
     * @returns {Promise<ICateGoryModel>}
     * @memberof ICateService
     */
    find(id: string): Promise<ICateGoryModel[]>;

    /**
     * @param {ICateGoryModel} ICateGoryModel
     * @returns {Promise<ICateGoryModel>}
     * @memberof ICateService
     */
    insert(request: Request): Promise<ICateGoryModel>;

    /**
     * @param {string} id
     * @returns {Promise<ICateGoryModel>}
     * @memberof ICateService
     */
    remove(id: string): Promise<ICateGoryModel>;

}
