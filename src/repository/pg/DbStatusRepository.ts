import  * as knex from "knex";

import IDbStatusRepository from "../IDbStatusRepository";

export default class DbStatusRepository implements IDbStatusRepository {

  private knex: knex;

  constructor(db: knex) {
    this.knex = db;
  }

  public async checkDbConnection() {
    await this.knex.raw("select 1 as dbIsUp");
  }
}