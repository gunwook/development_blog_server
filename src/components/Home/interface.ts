import { IHomeModel } from './model';
import { NextFunction, Request, Response } from 'express';
/**
 * @export
 * @interface IHomeService
 */
export interface IHomeService {


    /**
     * @param {string} id
     * @returns {Promise<IHomeModel>}
     */
    find(id: string): Promise<IHomeModel>;

    /**
     * @param {IHomeModel} IHomeModel
     * @returns {Promise<IHomeService>}
     */
    insert(request: Request): Promise<IHomeModel>;

    /**
     * @param {string} id
     * @returns {Promise<IHomeModel>}
     */
    remove(id: string): Promise<IHomeModel>;


    /**
     * @param {IHomeModel} IHomeModel
     * @returns {Promise<IHomeService>}
     */
    upload(request: Request): Promise<IHomeModel>;
}
