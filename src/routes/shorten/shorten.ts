import { Router, Request, Response, NextFunction } from "express";
import * as UrlValidation from "../../util/validation/url";
import ShortenSchema from "../../schemas/shorten";
import JsonSchema from "jsonschema";
import { app } from "../../app";
import { generateShortUrl } from "../../util/hash";

const router = Router();

const dbService = app.dbService;

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

router.post("/", ...validationSteps, async (req, res) => {
  const { url: extendedUrl } = req.body;
  const shortUrl = generateShortUrl(extendedUrl);
  await dbService.insertLinks(shortUrl, extendedUrl);
  res.send(shortUrl);
});

export default router;
