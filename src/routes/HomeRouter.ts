import { HomeComponent } from '../components';
import { Router } from 'express';
import upload from '../config/utils/multer'

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post('/save', HomeComponent.insertToHome);
router.get('/find', HomeComponent.find)
router.post('/upload',upload.array('photos'),HomeComponent.upload)

/**
 * @export {express.Router}
 */
export default router;
