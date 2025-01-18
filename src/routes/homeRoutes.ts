import { Router} from "express";

// homepage api, no authentication required
import { getHomePage, getArticlesByCategory,getArticleBySlug, getCategories } from "../controllers/homeControllers";

const router = Router();

// Get the homepage
router.get('/', getHomePage);
// get category wise articles
router.get('/category/:slug', getArticlesByCategory);
router.get('/news/:slug', getArticleBySlug);

router.get('/categories', getCategories);


export default router;