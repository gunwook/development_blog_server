import * as Joi from 'joi';
import StoryModel, { IStoryModel } from './model';
import { IStoryService } from './interface';
import { Types } from 'mongoose';
import Validation from './validation'
import CodeUtils from '../../config/utils/CodeUtils'
/**
 * @export
 * @implements {IStoryService}
 */
const StoryService: IStoryService = {
    /**
     * @param {string} id
     * @returns {Promise < IStoryModel >}
     * @memberof StoryService
     */
    async find(id: string): Promise <IStoryModel[]> {
        try {
            const validate: Joi.ValidationResult <string> = Validation.find(id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await StoryModel.find({
                story_id : id    
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IStoryModel} user
     * @returns {Promise < IStoryModel >}
     * @memberof StoryService
     */
    async insert(body: IStoryModel): Promise < IStoryModel > {
        try {
            const validate: Joi.ValidationResult < IStoryModel > = Validation.create(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IStoryModel = await StoryModel.create(body);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IStoryModel >}
     * @memberof StoryService
     */
    async remove(id: string): Promise < IStoryModel > {
        try {
            const validate: Joi.ValidationResult <string> = Validation.remove(id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IStoryModel = await StoryModel.updateOne({
                story_id : id    
            },{
                $set : {visible : CodeUtils.VISIBLE_N}
            })

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default StoryService;
