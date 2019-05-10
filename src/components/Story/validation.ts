import * as Joi from 'joi';
import Validation from '../validation';
import { IStoryModel } from './model';

/**
 * @export
 * @class StoryValidation
 * @extends Validation
 */
class StoryValidation extends Validation {

    /**
     * Creates an instance of StoryValidation.
     * @memberof StoryValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IStoryModel} params
     * @returns {Joi.ValidationResult<IStoryModel >}
     * @memberof StoryValidation
     */
    create(
        params: IStoryModel
    ): Joi.ValidationResult < IStoryModel > {
        const schema: Joi.Schema = Joi.object().keys({
            user_id: Joi.string().required(),
            title: Joi.string().required(),
            content: Joi.string().required(),
            cate_id: Joi.string().required()
        });

        return Joi.validate(params, schema);
    }


    /**
     * @param {string} story_id
     * @returns {Joi.ValidationResult<string>}
     * @memberof StoryValidation
     */
    find(
        story_id : string
    ) : Joi.ValidationResult<string>{
        return Joi.validate(story_id,Joi.string().required())
    }

   /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof StoryValidation
     */
    remove(
        story_id : string
    ) : Joi.ValidationResult<string>{
        return Joi.validate(story_id,Joi.string().required())
    }
}

export default new StoryValidation();
