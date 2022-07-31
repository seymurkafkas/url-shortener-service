import { Router, Request, Response, NextFunction } from "express";
import ExtendSchema from "../../schemas/extend";
import JsonSchema from "jsonschema";

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

router.post("/", ...validationSteps, (req: Request, res: Response) => {
  const requestedUrl = req.body;
  const responseData = `<h1>${requestedUrl.shortUrl} extend route<h1>`;
  res.send(responseData);
});

export default router;
