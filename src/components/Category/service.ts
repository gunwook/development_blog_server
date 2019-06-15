import * as Joi from 'joi';
import CateModel, { ICateGoryModel } from './model';
import { ICateService } from './interface';
import { Types } from 'mongoose';
import CateValidation from './validation'
import CodeUtils from '../../config/utils/CodeUtils'
import {Request} from 'express'
import { logger } from '../../config/utils/logger';

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
    async find(id: string): Promise <ICateGoryModel> {
        try {
            const cate = await CateModel.findOne({
                user_id : id    
            }, {_id : false});
            return cate
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
                user_id : req.body['user_id'],
                cate_value : req.body['cate_value'],
                visible : req.body['visible']
            })

            const validate: Joi.ValidationResult < ICateGoryModel > = CateValidation.createCateGory(model.toObject());

            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const find = await CateModel.findOne({user_id : model.user_id});
            let user: ICateGoryModel; 
            if (find){
                user = await CateModel.updateOne({user_id: model.user_id},{$set:{cate_value : model.cate_value , visible : model.visible}})
            }else {
                user = await CateModel.create(model);
            }
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
