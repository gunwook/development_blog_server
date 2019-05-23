import HomeRouter from './HomeRouter';
import StoryRouter from './StoryRouter';
import CategoryRouter from './CategoryRouter'
import CategoryBodyRouter from './CategoryBodyRouter'

import { Router } from 'express';
import upload from '../config/utils/multer'
import * as express from 'express';

/**
 * @constant {express.Router}
 */
const router: express.Router = express.Router();

router.use('/home', HomeRouter);
router.use('/story', StoryRouter);
router.use('/category',CategoryRouter)
router.use('/categorybody',CategoryBodyRouter)


/**
 * @export {express.Router}
 */
export default router;
