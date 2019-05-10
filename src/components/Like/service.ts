import * as Joi from 'joi';
import LikeModel, { ILikeModel } from './model';
import { ILikeService } from './interface';
import { Types } from 'mongoose';
import Validation from './validation'
import CodeUtils from '../../config/utils/CodeUtils'
/**
 * @export
 * @implements {LikeService}
 */
const LikeService: ILikeService = {
    /**
     * @param {string} id
     * @returns {Promise < ILikeModel >}
     * @memberof LikeService
     */
    async find(id: string): Promise <ILikeModel[]> {
        try {
            const validate: Joi.ValidationResult <string> = Validation.find(id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await LikeModel.find({
                like_id : id    
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {ILikeModel} user
     * @returns {Promise < ILikeModel >}
     * @memberof LikeService
     */
    async insert(body: ILikeModel): Promise < ILikeModel > {
        try {
            const validate: Joi.ValidationResult < ILikeModel > = Validation.create(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: ILikeModel = await LikeModel.create(body);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < ILikeModel >}
     * @memberof LikeService
     */
    async remove(id: string): Promise < ILikeModel > {
        try {
            const validate: Joi.ValidationResult <string> = Validation.remove(id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: ILikeModel = await LikeModel.updateOne({
                story_id : id    
            },{
                $set : {is_like_yn : CodeUtils.VISIBLE_N}
            })

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default LikeService;
