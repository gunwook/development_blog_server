import { IStoryModel } from './model';

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
     * @param {IStoryModel} IStoryModel
     * @returns {Promise<IStoryModel>}
     * @memberof IStoryService
     */
    insert(IStoryModel: IStoryModel): Promise<IStoryModel>;

    /**
     * @param {string} id
     * @returns {Promise<IStoryModel>}
     * @memberof IStoryService
     */
    remove(id: string): Promise<IStoryModel>;

}
