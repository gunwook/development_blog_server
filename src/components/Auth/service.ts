import * as Joi from 'joi';
import AuthValidation from './validation';
import UserModel, { IUserModel , SignUp } from '../User/model';
import { IAuthService } from './interface';
import { logger } from '../../config/utils/logger';

/**
 * @export
 * @implements {IAuthService}
 */
const AuthService: IAuthService = {

    /**
     * @param {IUserModel} body
     * @returns {Promise <IUserModel>}
     * @memberof AuthService
     */
    async createUser(body: SignUp): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult < SignUp > = AuthValidation.createUser(body);

            if (validate.error) {
                logger.info(validate.error.message)
                throw new Error(validate.error.message);
            }

            const user: IUserModel = new UserModel({
                profile : {
                    name : body.name
                },
                email: body.email,
                password: body.password
            });

            const query: IUserModel = await UserModel.findOne({
                email: body.email
            });

            if (query) {
                logger.info(query)
                throw new Error('This email already exists');
            }

            const saved: IUserModel = await user.save();

            return saved;
        } catch (error) {
            logger.info(error)
            throw new Error(error);
        }
    },
};

export default AuthService;
