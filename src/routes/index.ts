import { Router } from "express";
import extend from "./extend";
import shorten from "./shorten";

const router = Router();

router.use("/shorten", shorten);
router.use("/extend", extend);

export default router;
