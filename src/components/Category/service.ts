import * as Joi from 'joi';
import CateModel, { ICateGoryModel } from './model';
import { ICateService } from './interface';
import { Types } from 'mongoose';
import CateValidation from './validation'
import CodeUtils from '../../config/utils/CodeUtils'
/**
 * @export
 * @implements {ICateService}
 */
const CateService: ICateService = {
    /**
     * @param {string} id
     * @returns {Promise < ICateGoryModel >}
     * @memberof CateService
     */
    async find(id: string): Promise <ICateGoryModel[]> {
        try {
            const validate: Joi.ValidationResult <string> = CateValidation.findCateGory(id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await CateModel.find({
                user_id : id    
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {ICateGoryModel} user
     * @returns {Promise < ICateGoryModel >}
     * @memberof CateService
     */
    async insert(body: ICateGoryModel): Promise < ICateGoryModel > {
        try {
            const validate: Joi.ValidationResult < ICateGoryModel > = CateValidation.createCateGory(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: ICateGoryModel = await CateModel.create(body);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < ICateGoryModel >}
     * @memberof CateService
     */
    async remove(id: string): Promise < ICateGoryModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = CateValidation.removeCate({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: ICateGoryModel = await CateModel.updateOne({
                cate_id : id
            },{
                $set : {visible : CodeUtils.VISIBLE_N}
            })

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default CateService;
