import { Router } from "express";
import extend from "./extend";

const router = Router();

router.use("/", extend);

export default router;
