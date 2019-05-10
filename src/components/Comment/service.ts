import * as Joi from 'joi';
import CommentModel, { ICommentModel } from './model';
import { ICommentService } from './interface';
import { Types } from 'mongoose';
import Validation from './validation'
import CodeUtils from '../../config/utils/CodeUtils'
/**
 * @export
 * @implements {CommentService}
 */
const CommentService: ICommentService = {
    /**
     * @param {string} id
     * @returns {Promise < ICommentModel >}
     * @memberof LikeService
     */
    async find(id: string): Promise <ICommentModel[]> {
        try {
            const validate: Joi.ValidationResult <string> = Validation.find(id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await CommentModel.find({
                comment_id : id    
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {ICommentModel} user
     * @returns {Promise < ICommentModel >}
     * @memberof CommentService
     */
    async insert(body: ICommentModel): Promise < ICommentModel > {
        try {
            const validate: Joi.ValidationResult < ICommentModel > = Validation.create(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: ICommentModel = await CommentModel.create(body);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < ICommentModel >}
     * @memberof CommentService
     */
    async remove(id: string): Promise < ICommentModel > {
        try {
            const validate: Joi.ValidationResult <string> = Validation.remove(id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: ICommentModel = await CommentModel.updateOne({
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

export default CommentService;
