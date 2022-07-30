import { Router } from "express";
import shorten from "./shorten";

const router = Router();

router.use("/", shorten);

export default router;
