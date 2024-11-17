import { Router } from "express";
import { getSkin, insertSkin } from "../endpoints/skins";

const router = Router();

router.get('/', getSkin);
router.post('/insertDefinition', insertSkin);

export default router;