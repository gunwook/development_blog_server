import * as express from 'express';
import * as http from 'http';
import * as passportConfig from '../config/middleware/passport';
import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';
import HomeRouter from './HomeRouter'

/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    /**
     * @description
     *  Forwards any requests to the /v1/users URI to our UserRouter
     *  Also, check if user authenticated
     * @constructs
     */
    app.use('/v1/users', passportConfig.isAuthenticated, UserRouter);

    /**
     * @description
     * Home 관련 데이터 처리
     * @constructs
     */
    app.use('/home', passportConfig.isAuthenticated,HomeRouter)

    /**
     * @description Forwards any requests to the /auth URI to our AuthRouter
     * @constructs
     */
    app.use('/auth', AuthRouter);

    /** 
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req, res, next) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    /**
     * @constructs all routes
     */
    app.use(router);
}
