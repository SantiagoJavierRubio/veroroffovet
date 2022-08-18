import { Router } from "express";
import controllers from "./controllers";

const router = Router();

router.get('/recursos', controllers.getRecursos);
router.get('/clientes', controllers.getClientes);
router.get('/token', controllers.getToken);
router.post('/refreshMetaToken', controllers.refreshMetaToken);

export default router;