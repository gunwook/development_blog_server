import { StoryComponent } from '../components';
import { Router } from 'express';
import upload from '../config/utils/multer'

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post('/save',upload.array('photos'), StoryComponent.insertToStory);
router.get('/find', StoryComponent.find)


/**
 * @export {express.Router}
 */
export default router;
