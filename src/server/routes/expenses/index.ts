import { Router } from "express";

import verifyToken from "./../../verify-token";
import list from "./list";
import create from "./create";
import years from "./years";

const router = Router();

router.get("/", verifyToken, list);
router.post("/", verifyToken, create);
router.get("/years", verifyToken, years);

export default router;