import * as Joi from 'joi';
import CateBodyModel, { ICateGoryBodyModel } from './model';
import { ICateBodyService } from './interface';
import { Types } from 'mongoose';
import Validation from './validation'
import CodeUtils from '../../config/utils/CodeUtils'
import { Request } from 'express'

/**
 * @export
 * @implements {ICateBodyService}
 */
const CateBodyService: ICateBodyService = {

    /**
     * 검색
     * @param {string} cate_id
     */
    async find(cate_id: string): Promise <ICateGoryBodyModel[]> {
        try {
            const validate: Joi.ValidationResult <string> = Validation.find(cate_id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await CateBodyModel.find({  
                cate_id : cate_id,
                visible : CodeUtils.VISIBLE_Y
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @description 삽입
     * @param {Request} req
     */
    async insert(req: Request): Promise < ICateGoryBodyModel > {
        try {
            let model =  new CateBodyModel({
                cate_id : req.body['cate_id'],
                cate_value : req.body['cate_value'],
                visible : req.body['visible']
            })

            const validate: Joi.ValidationResult < ICateGoryBodyModel > = Validation.create(model.toObject());

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: ICateGoryBodyModel = await CateBodyModel.create(model);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * 제거
     * @param {string} id
     */
    async remove(id: string): Promise < ICateGoryBodyModel > {
        try {
            const validate: Joi.ValidationResult <string> = Validation.remove(id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: ICateGoryBodyModel = await CateBodyModel.updateOne({
                cate_body_id : id
            },{
                $set : {visible : CodeUtils.VISIBLE_N}
            })

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default CateBodyService;
