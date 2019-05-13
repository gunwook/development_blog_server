import * as Joi from 'joi';
import HomeModel, { IHomeModel } from './model';
import { IHomeService } from './interface';
import { Types } from 'mongoose';
import Validation from './validation'
import CodeUtils from '../../config/utils/CodeUtils'

/**
 * @implements {IHomeService}
 */
const HomeService: IHomeService = {
    /**
     * @param {string} id
     * @returns {Promise < IHomeModel >}
     */
    async find(id: string): Promise <IHomeModel[]> {
        try {
            const validate: Joi.ValidationResult <string> = Validation.find(id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await HomeModel.find({
                home_id : id    
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IHomeModel} user
     * @returns {Promise < IHomeModel >}
     */
    async insert(body: IHomeModel): Promise < IHomeModel > {
        try {
            const validate: Joi.ValidationResult < IHomeModel > = Validation.create(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IHomeModel = await HomeModel.create(body);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IHomeModel >}
     */
    async remove(id: string): Promise < IHomeModel > {
        try {
            const validate: Joi.ValidationResult <string> = Validation.remove(id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IHomeModel = await HomeModel.updateOne({
                home_id : id    
            },{
                $set : {visible : CodeUtils.VISIBLE_N}
            })

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default HomeService;
