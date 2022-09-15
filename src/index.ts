import express, { Express } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import routes from "./routes";
import "./app";

const expressApp: Express = express();

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

expressApp.use(helmet());
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));

expressApp.use("/", routes);
expressApp.listen(PORT, () => console.log(`Listening on ${PORT}`));
