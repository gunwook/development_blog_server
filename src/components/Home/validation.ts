import * as Joi from 'joi';
import Validation from '../validation';
import { IHomeModel } from './model';

/**
 * @class HomeValidation
 * @extends Validation
 */
class HomeValidation extends Validation {

    constructor() {
        super();
    }

    /**
     * @param {any} params
     * @returns {Joi.ValidationResult<IHomeModel >}
     */
    create(
        params: any
    ): Joi.ValidationResult < any > {
        const schema = {  
            user_id : Joi.string().required(),
            title :Joi.string().required(),
            subtitle :Joi.string().required(),
            conts : Joi.string().required(),
            image :Joi.array().optional(),
            wisesaying : Joi.string().required(),
            visible :Joi.any().valid(['y' , 'n']),
        }

        return Joi.validate(params, schema);
    }


    /**
     * @param {string} user_id
     * @returns {Joi.ValidationResult<string>}
     * @memberof HomeValidation
     */
    find(
        user_id : string
    ) : Joi.ValidationResult<string>{
        return Joi.validate(user_id,Joi.string().required())
    }

    /**
     * @param {Array<string>} image
     * @returns {Joi.ValidationResult<string>}
     * @memberof HomeValidation
     */
    upload(
        image : Array<string>
    ) : Joi.ValidationResult<Array<string>>{
        return Joi.validate(image,Joi.array().required())
    }

   /**
     * @param {{ id: string }} user_id
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof HomeValidation
     */
    remove(
        user_id : string
    ) : Joi.ValidationResult<string>{
        return Joi.validate(user_id,Joi.string().required())
    }
}

export default new HomeValidation();
