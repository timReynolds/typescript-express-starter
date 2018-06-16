import * as knex from "knex";
import dbStatusQueryHandlerBuilder from "./dbStatusQueryHandler";

import DbStatusRepository from "../repository/pg/DbStatusRepository";

export default (db: knex) => {
  const dbStatusRepository = new DbStatusRepository(db);

  return {
    dbStatusQueryHandler: dbStatusQueryHandlerBuilder({ dbStatusRepository })
  };
};
