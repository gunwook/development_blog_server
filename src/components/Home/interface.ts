import { IHomeModel } from './model';

/**
 * @export
 * @interface IHomeService
 */
export interface IHomeService {


    /**
     * @param {string} id
     * @returns {Promise<IHomeModel>}
     */
    find(id: string): Promise<IHomeModel[]>;

    /**
     * @param {IHomeModel} IHomeModel
     * @returns {Promise<IHomeService>}
     */
    insert(IHomeModel: IHomeModel): Promise<IHomeModel>;

    /**
     * @param {string} id
     * @returns {Promise<IHomeModel>}
     */
    remove(id: string): Promise<IHomeModel>;

}
