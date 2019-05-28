import * as Joi from 'joi';
import Validation from '../validation';
import { ILikeModel } from './model';

/**
 * @export
 * @class LikeValidation
 * @extends Validation
 */
class LikeValidation extends Validation {

    /**
     * Creates an instance of StoryValidation.
     * @memberof LikeValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {ILikeModel} params
     * @returns {Joi.ValidationResult<ILikeModel >}
     * @memberof LikeValidation
     */
    create(
        params: ILikeModel
    ): Joi.ValidationResult < ILikeModel > {
        const schema: Joi.Schema = Joi.object().keys({
            user_id: Joi.string().required(),
            story_id: Joi.string().required(),
            is_like_yn: Joi.any().valid(['y' , 'n'])
        });

        return Joi.validate(params, schema);
    }


    /**
     * @param {string} story_id
     * @returns {Joi.ValidationResult<string>}
     * @memberof LikeValidation
     */
    find(
        story_id : string
    ) : Joi.ValidationResult<string>{
        return Joi.validate(story_id,Joi.string().required())
    }

   /**
     * @param {{ id: string }} like_id
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof LikeValidation
     */
    remove(
        like_id : string
    ) : Joi.ValidationResult<string>{
        return Joi.validate(like_id,Joi.string().required())
    }
}

export default new LikeValidation();
