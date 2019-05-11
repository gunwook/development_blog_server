import { IUserModel, SignUp } from '../User/model';

/**
 * @export
 * @interaface IAuthService
 */
export interface IAuthService {
    /**
     * @param {SignUp} SignUp
     * @returns {Promise<IUserModel>}
     * @memberof AuthService
     */
    createUser(signUp: SignUp): Promise < IUserModel > ;
}
