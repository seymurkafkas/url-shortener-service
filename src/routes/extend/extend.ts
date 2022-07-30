import { Router } from "express";

const router = Router();

router.use("/", (req, res) => {
  const responseData = "<h1>extend url route<h1>";
  res.send(responseData);
});

export default router;
