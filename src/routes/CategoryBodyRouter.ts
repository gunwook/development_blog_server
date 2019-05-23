import { CategoryBodyComponent } from '../components';
import { Router } from 'express';
import upload from '../config/utils/multer'

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post('/save', CategoryBodyComponent.save);
router.get('/find', CategoryBodyComponent.find)


/**
 * @export {express.Router}
 */
export default router;
