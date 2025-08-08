import { Router } from "express";
import PloomesControllers from "../Controllers/PloomesControllers.js";

const router = new Router();

router.get('/:tableId', PloomesControllers.search.bind(PloomesControllers));

export default router;