import { Router} from "express";

// homepage api, no authentication required
import { getHomePage } from "../controllers/homeControllers";

const router = Router();

// Get the homepage
router.get('/', getHomePage);

export default router;