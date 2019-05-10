import { ILikeModel } from './model';

/**
 * @export
 * @interface ILikeService
 */
export interface ILikeService {


    /**
     * @param {string} id
     * @returns {Promise<ILikeModel>}
     * @memberof ILikeService
     */
    find(id: string): Promise<ILikeModel[]>;

    /**
     * @param {ILikeModel} ILikeModel
     * @returns {Promise<ILikeModel>}
     * @memberof ILikeService
     */
    insert(ILikeModel: ILikeModel): Promise<ILikeModel>;

    /**
     * @param {string} id
     * @returns {Promise<ILikeModel>}
     * @memberof ILikeService
     */
    remove(id: string): Promise<ILikeModel>;

}
