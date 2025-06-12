import { Router } from "express";
import CadastroControllers from "../Controllers/CadastroControllersOnline.js";

const router = new Router();

router.post('/env/', CadastroControllers.store.bind(CadastroControllers));

export default router;