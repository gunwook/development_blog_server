import * as express from 'express';
import * as Middleware from '../middleware/middleware';
import * as Routes from '../../routes';
import * as connections from '../../config/connection/connection';
/**
 * @constant {express.Application}
 */
const app: express.Application = express();

/**
 * @constructor mongo db 초기화
 */
connections.init()

/** 
 * @constructs express.Application Middleware
 */
Middleware.configure(app);

/**
 * @constructs express.Application Routes
 */
Routes.init(app);

/**
 * @constructs express.Application Error Handler
 */
Middleware.initErrorHandler(app);

/**
 * sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3000);

/**
 * sets secret to 'superSecret', otherwise specified in the environment
 */
app.set('secret', process.env.SECRET || 'superSecret');

/**
 * @exports {express.Application}
 */
export default app;
