import { LikeComponent } from '../components';
import { Router } from 'express';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post('/save' , LikeComponent.save);
router.get('/find', LikeComponent.find)


/**
 * @export {express.Router}
 */
export default router;
