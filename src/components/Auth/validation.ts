import * as Joi from 'joi';
import Validation from '../validation';
import { IUserModel, SignUp } from '../User/model';

/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class AuthValidation extends Validation {

     /**
     * Creates an instance of AuthValidation.
     * @memberof AuthValidation
     */
    constructor() {
        super();
    }
    /**
     * @param {SignUp} params
     * @returns {Joi.ValidationResult<SignUp >}
     * @memberof UserValidation
     */
    createUser(
        params: SignUp
    ): Joi.ValidationResult < SignUp > {
        const schema: Joi.Schema = Joi.object().keys({
            name : Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required()
        });

        return Joi.validate(params, schema);
    }
}

export default new AuthValidation();
