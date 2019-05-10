import * as Joi from 'joi';
import Validation from '../validation';
import { ICateGoryBodyModel } from './model';

/**
 * @export
 * @class CateBodyValidation
 * @extends Validation
 */
class CateBodyValidation extends Validation {


    constructor() {
        super();
    }

    create(
        params: ICateGoryBodyModel
    ): Joi.ValidationResult < ICateGoryBodyModel > {
        const schema: Joi.Schema = Joi.object().keys({
            cate_id: Joi.string().required(),
            cate_body_value: Joi.string().required()
        });

        return Joi.validate(params, schema);
    }

    find(
        cate_id : string
    ) : Joi.ValidationResult<string>{
        return Joi.validate(cate_id,Joi.string().required())
    }

    remove(
        cate_id : string
    ) : Joi.ValidationResult<string>{
        return Joi.validate(cate_id,Joi.string().required())
    }
}

export default new CateBodyValidation();
