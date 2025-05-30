import { Router } from "express";
import { getBeneficiarios } from "../controllers/beneficiarios.controller";
const router = Router();

router.get('/beneficiarios',getBeneficiarios);



export default router;