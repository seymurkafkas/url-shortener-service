import { Router, Request, Response } from "express";

const router = Router();
const validationSteps: { (): void }[] = [];

router.post("/", ...validationSteps, (req: Request, res: Response) => {
  const requestedUrl = req.body;
  const responseData = `<h1>${requestedUrl.url} extend route<h1>`;
  res.send(responseData);
});

export default router;
