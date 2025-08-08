import { Router } from "express";
import CadastroControllers from "../Controllers/CadastroControllersOffline.js";
import multer from "multer";

const upload = multer({ dest: 'uploads/' });

const router = new Router();

router.post('/env/', CadastroControllers.store.bind(CadastroControllers)); // Usando o bind para garantir que o this continue se referindo corretamente ao objeto pai;
router.post('/upload/', upload.single('file'), CadastroControllers.upload.bind(CadastroControllers));

export default router;