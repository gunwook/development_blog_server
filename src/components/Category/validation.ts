import * as Joi from 'joi';
import Validation from '../validation';
import { ICateGoryModel } from './model';

/**
 * @export
 * @class CateValidation
 * @extends Validation
 */
class CateValidation extends Validation {

    /**
     * Creates an instance of CateValidation.
     * @memberof CateValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {ICateGoryModel} params
     * @returns {Joi.ValidationResult<ICateGoryModel >}
     * @memberof CateValidation
     */
    createCateGory(
        params: ICateGoryModel
    ): Joi.ValidationResult < ICateGoryModel > {
        const schema: Joi.Schema = Joi.object().keys({
            user_id: Joi.string().required(),
            cate_value: Joi.string().required()
        });

        return Joi.validate(params, schema);
    }


    /**
     * @param {string} user_id
     * @returns {Joi.ValidationResult<string>}
     * @memberof CateValidation
     */
    findCateGory(
        user_id : string
    ) : Joi.ValidationResult<string>{
        return Joi.validate(user_id,Joi.string().required())
    }

   /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof CateValidation
     */
    removeCate(
        body: {
            id: string
        }
    ): Joi.ValidationResult < {
        id: string
    } > {
        const schema: Joi.Schema = Joi.object().keys({
            id: Joi.string().required()
        });

        return Joi.validate(body, schema);
    }
}

export default new CateValidation();
