import * as tricorder from "@trussle/tricorder";
import * as dotenv from "dotenv";
import * as express from "express";
import * as helmet from "helmet";
import * as HttpStatus from "http-status-codes";
import * as knexBuilder from "knex";

import ValidationError from "../error/ValidationError";
import queryBuilder from "../queries";

dotenv.config();

// tslint:disable: no-console
// don't ever do this in production 
// unless you like your username and password in the output
console.info(`Connecting to database: ${process.env.PG_CONNECTION_STRING}`);

const db = knexBuilder({
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING
});

const queries = queryBuilder(db);

const app: express.Express = express();
let isInShutdown = false;

const gracefulShutdown = async () => {
  isInShutdown = true;
  await db.destroy();
}

const statusCheck = async (req: express.Request, res: express.Response) => {
  if(isInShutdown) {
    res.sendStatus(HttpStatus.SERVICE_UNAVAILABLE);
  };

  try {
    await queries.dbStatusQueryHandler({});
    res.sendStatus(HttpStatus.OK);
  } catch (error) {
    console.error(error);
    res.sendStatus(HttpStatus.SERVICE_UNAVAILABLE);
  }
}

app.use(helmet())
app.get("/status/health", statusCheck);
app.get("/status/ready", statusCheck);

tricorder.instrument(app);

app.use((err: Error, req: any, res: any, next: any) => {
  if (err instanceof ValidationError) {
    return res.status(HttpStatus.BAD_REQUEST).send({ error: err.message });
  }
  console.error("ERROR", err);
  return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
});

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

export default app;
