import { DBService } from "./services/db/DBService";
import dotenv from "dotenv";

export class App {
  private _dbService: DBService;

  constructor() {
    dotenv.config();
    this._dbService = new DBService();
  }

  public get dbService() {
    return this._dbService;
  }
}

export const app = new App();
