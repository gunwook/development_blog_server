import * as express from 'express';
import * as http from 'http';
import * as passportConfig from '../config/middleware/passport';
import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';

import ApiRouter from './ApiRouter'
import {logger} from '../config/utils/logger'
import * as morgan from 'morgan'
/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
    const router: express.Router = express.Router();
    
    /** 
     * @description
     * http logging
     * @constructs
    */
    app.use(morgan(function (tokens, req, res) {
        return [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'), '-',
          tokens['response-time'](req, res), 'ms',
          req.method == 'GET' ? JSON.stringify(req.query) : JSON.stringify(req.body)
        ].join(' ')
      }))
    
    /**
     * @description
     *  Forwards any requests to the /v1/users URI to our UserRouter
     *  Also, check if user authenticated
     * @constructs
     */
    app.use('/v1/users', passportConfig.isAuthenticated, UserRouter);


     /**
     * @description Forwards any requests to the /auth URI to our AuthRouter
     * @constructs
     */
    app.use('/auth', AuthRouter);
    
    /**
     * @description
     * 버전 v1 관련 api 처리 진행
     * @constructs
     */
    app.use('/v1',passportConfig.isAuthenticated , ApiRouter)

   

    /** 
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req, res, next) => {
        logger.error("Not Found" + req.path)

        res.status(404).send(http.STATUS_CODES[404]);
    });

    /**
     * @constructs all routes
     */
    app.use(router);
}
