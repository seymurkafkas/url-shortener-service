import { Router, Request, Response, NextFunction } from "express";
import * as UrlValidation from "../../util/validation/url";
import ShortenSchema from "../../schemas/shorten";
import JsonSchema from "jsonschema";

const router = Router();
const SchemaValidator = JsonSchema.Validator;
const schemaValidator = new SchemaValidator();
const schemaValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    schemaValidator.validate(req.body, ShortenSchema, {
      throwError: true,
    });
    next();
  } catch (err: unknown) {
    next(err);
  }
};
const urlValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    UrlValidation.validateUrl(req.body.url);
    next();
  } catch (err: unknown) {
    next(err);
  }
};
const validationSteps = [schemaValidation, urlValidation];

router.post("/", ...validationSteps, (req, res) => {
  const requestedUrl = req.body;
  const responseData = `<h1>${requestedUrl.url} url route<h1>`;
  res.send(responseData);
});

export default router;
