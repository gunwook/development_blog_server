import { ICommentModel } from './model';

/**
 * @export
 * @interface ICommentService
 */
export interface ICommentService {


    /**
     * @param {string} id
     * @returns {Promise<ICommentModel>}
     * @memberof ICommentService
     */
    find(id: string): Promise<ICommentModel[]>;

    /**
     * @param {ICommentModel} ILikeModel
     * @returns {Promise<ICommentModel>}
     * @memberof ICommentService
     */
    insert(ILikeModel: ICommentModel): Promise<ICommentModel>;

    /**
     * @param {string} id
     * @returns {Promise<ICommentModel>}
     * @memberof ICommentService
     */
    remove(id: string): Promise<ICommentModel>;

}
