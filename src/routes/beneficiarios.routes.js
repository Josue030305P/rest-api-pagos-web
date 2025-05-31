import { Router } from "express";
import { getBeneficiarios, addBeneficiarios, updateBeneficiario, getBeneficiarioById} from "../controllers/beneficiarios.controller.js";

const router = Router();

router.get('/beneficiarios',getBeneficiarios);
router.get('/beneficiarios/:id', getBeneficiarioById);
router.post('/beneficiarios',addBeneficiarios);
router.put('/beneficiarios/:id', updateBeneficiario);

export default router;