import { HomeComponent } from '../components';
import { Router } from 'express';
import upload from '../config/utils/multer'

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post('/save',upload.array('photos'), HomeComponent.insertToHome);
router.get('/find', HomeComponent.find)


/**
 * @export {express.Router}
 */
export default router;
