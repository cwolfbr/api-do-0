import { Router } from "express";
import CadastroControllers from "../Controllers/CadastroControllersOnline.js";

const router = new Router();

router.post('/env/', CadastroControllers.store.bind(CadastroControllers));
router.get(
  '/bucket/last',
  CadastroControllers.showLastBucket.bind(CadastroControllers)
);

export default router;