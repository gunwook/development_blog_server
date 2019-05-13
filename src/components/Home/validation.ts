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
     * @param {IHomeModel} params
     * @returns {Joi.ValidationResult<IHomeModel >}
     */
    create(
        params: IHomeModel
    ): Joi.ValidationResult < IHomeModel > {
        const schema: Joi.Schema = Joi.object().keys({
            
            user_id : Joi.string().required(),
            home_id :Joi.string().required(),
            backgroundimage :Joi.string().required(),
            title :Joi.string().required(),
            subtitle :Joi.string().required(),
            conts : Joi.string().required(),
            image :Joi.string().required(),
            wisesaying : Joi.string().required(),
            visible :Joi.string().required()
        });

        return Joi.validate(params, schema);
    }


    /**
     * @param {string} home_id
     * @returns {Joi.ValidationResult<string>}
     * @memberof HomeValidation
     */
    find(
        home_id : string
    ) : Joi.ValidationResult<string>{
        return Joi.validate(home_id,Joi.string().required())
    }

   /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof HomeValidation
     */
    remove(
        home_id : string
    ) : Joi.ValidationResult<string>{
        return Joi.validate(home_id,Joi.string().required())
    }
}

export default new HomeValidation();
