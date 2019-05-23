import { CategoryComponent } from '../components';
import { Router } from 'express';
import upload from '../config/utils/multer'

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post('/save', CategoryComponent.insertToCategory);
router.get('/find', CategoryComponent.find)


/**
 * @export {express.Router}
 */
export default router;
