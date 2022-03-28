import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { authRoutes } from "./authentication";
import { carsRoutes } from "./cars.routes";

import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/categories", ensureAuthenticated, categoriesRoutes)
router.use("/specifications",specificationsRoutes)
router.use("/users", ensureAuthenticated, userRoutes)
router.use("/cars", ensureAuthenticated, carsRoutes)
router.use("/sessions",authRoutes)

export { router }