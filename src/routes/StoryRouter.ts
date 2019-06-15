import { StoryComponent } from '../components';
import { Router } from 'express';
import upload from '../config/utils/multer'

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post('/save', StoryComponent.insertToStory);
router.get('/find', StoryComponent.find)
router.post('/upload',upload.array('photos'),StoryComponent.upload)


/**
 * @export {express.Router}
 */
export default router;
