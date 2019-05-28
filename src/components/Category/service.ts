import * as Joi from 'joi';
import CateModel, { ICateGoryModel } from './model';
import { ICateService } from './interface';
import { Types } from 'mongoose';
import CateValidation from './validation'
import CodeUtils from '../../config/utils/CodeUtils'
import {Request} from 'express'

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
            }, {_id : false});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {ICateGoryModel} user
     * @returns {Promise < ICateGoryModel >}
     * @memberof CateService
     */
    async insert(req: Request): Promise < ICateGoryModel > {
        try {
            let model = new CateModel({
                user_id : String(req.user._id),
                cate_value : req.body['cate_value'],
                visible : req.body['visible']
            })


            const validate: Joi.ValidationResult < ICateGoryModel > = CateValidation.createCateGory(model.toObject());

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: ICateGoryModel = await CateModel.create(model);

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
