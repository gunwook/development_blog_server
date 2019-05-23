import { ICateGoryBodyModel } from './model';
import { Request } from 'express'
/**
 * @export
 * @interface ICateBodyService
 */
export interface ICateBodyService {

    /**
     * @param {string} id
     * @returns {Promise<ICateGoryBodyModel>}
     * @memberof ICateBodyService
     */
    find(id: string): Promise<ICateGoryBodyModel[]>;

    /**
     * @param {ICateGoryBodyModel} ICateGoryModel
     * @returns {Promise<ICateGoryModel>}
     * @memberof ICateBodyService
     */
    insert(request: Request): Promise<ICateGoryBodyModel>;

    /**
     * @param {string} id
     * @returns {Promise<ICateGoryBodyModel>}
     * @memberof ICateBodyService
     */
    remove(id: string): Promise<ICateGoryBodyModel>;

}