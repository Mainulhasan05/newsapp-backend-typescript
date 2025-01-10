import { Router} from "express";

// homepage api, no authentication required
import { getHomePage, getArticlesByCategory,getArticleBySlug } from "../controllers/homeControllers";

const router = Router();

// Get the homepage
router.get('/', getHomePage);
// get category wise articles
router.get('/category/:slug', getArticlesByCategory);
router.get('/news/:slug', getArticleBySlug);


export default router;