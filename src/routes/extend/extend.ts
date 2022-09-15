import { Router, Request, Response, NextFunction } from "express";
import ExtendSchema from "../../schemas/extend";
import JsonSchema from "jsonschema";
import { app } from "../../app";

const dbService = app.dbService;

const router = Router();
const SchemaValidator = JsonSchema.Validator;
const schemaValidator = new SchemaValidator();
const schemaValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    schemaValidator.validate(req.body, ExtendSchema, {
      throwError: true,
    });
    next();
  } catch (err: unknown) {
    next(err);
  }
};
const validationSteps = [schemaValidation];

router.post("/", ...validationSteps, async (req: Request, res: Response) => {
  const { shortUrl } = req.body;
  const extendedUrl = await dbService.fetchExtendedLink(shortUrl);
  res.send(extendedUrl);
});

export default router;
