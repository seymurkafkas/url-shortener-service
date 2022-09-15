import { Pool } from "pg";

export class DBService {
  private pool: Pool;
  constructor() {
    this.pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "api",
      password: "122334",
      port: 5432,
    });
  }

  public async insertLinks(shortLink: string, extendedLink: string) {
    await this.pool.query(
      "INSERT INTO links(short_link,extended_link) VALUES ($1, $2);",
      [shortLink, extendedLink]
    );
  }

  public async fetchExtendedLink(shortLink: string) {
    const queryResult = await this.pool.query(
      "SELECT extended_link FROM links WHERE short_link = $1;",
      [shortLink]
    );

    const extendedLink = queryResult.rows[0]?.extended_link ?? null;
    if (extendedLink === null) throw new Error("Invalid Short Link");
    return extendedLink;
  }
}
