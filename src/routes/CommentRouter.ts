import { CommentComponent } from '../components';
import { Router } from 'express';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post('/save' ,CommentComponent.save);
router.get('/find', CommentComponent.find)


/**
 * @export {express.Router}
 */
export default router;
