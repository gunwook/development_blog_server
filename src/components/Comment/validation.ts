import * as Joi from 'joi';
import Validation from '../validation';
import { ICommentModel } from './model';

/**
 * @export
 * @class CommentValidation
 * @extends Validation
 */
class CommentValidation extends Validation {

    /**
     * Creates an instance of CommentValidation.
     * @memberof CommentValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {ICommentModel} params
     * @returns {Joi.ValidationResult<ICommentModel >}
     * @memberof CommentValidation
     */
    create(
        params: ICommentModel
    ): Joi.ValidationResult < ICommentModel > {
        const schema: Joi.Schema = Joi.object().keys({
            user_id: Joi.string().required(),
            story_id: Joi.string().required(),
            content: Joi.string().required()
        });

        return Joi.validate(params, schema);
    }


    /**
     * @param {string} story_id
     * @returns {Joi.ValidationResult<string>}
     * @memberof CommentValidation
     */
    find(
        story_id : string
    ) : Joi.ValidationResult<string>{
        return Joi.validate(story_id,Joi.string().required())
    }

   /**
     * @param {{ id: string }} like_id
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof CommentValidation
     */
    remove(
        like_id : string
    ) : Joi.ValidationResult<string>{
        return Joi.validate(like_id,Joi.string().required())
    }
}

export default new CommentValidation();
