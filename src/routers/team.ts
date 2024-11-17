import { Router } from "express";
import { fetchTeams, registerTeam } from "../endpoints/team";

const router = Router();

router.get('/', fetchTeams);
router.post('/register', registerTeam);

export default router;
