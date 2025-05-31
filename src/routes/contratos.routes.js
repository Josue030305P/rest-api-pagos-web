import { Router } from "express";
import { getContratos, addContrato } from "../controllers/contratos.controller.js";

const router = Router();

router.get('/contratos', getContratos);
router.post('/contratos', addContrato);



export default router;