import * as dotenv from "dotenv";
import * as knexBuilder from "knex";

import DbStatusRepository from "../../../src/repository/pg/DbStatusRepository";

dotenv.config();

describe("pg/DbStatusRepository", () => {
  
  describe("checkDbConnection", () => {
    test("When connected to the database, should resolve", () => {
      // Arrange
      const db = knexBuilder({
        client: "pg",
        connection: process.env.PG_CONNECTION_STRING
      });
      
      const sut = new DbStatusRepository(db);

      // Act
      return (
        expect(sut.checkDbConnection())
          // Assert
          .resolves.toBe(undefined)
      );
    });

    test("When not connected to the database, should reject", () => {
      // Arrange
      const db = knexBuilder({
        client: "pg",
        connection: "not the database string"
      });
      
      const sut = new DbStatusRepository(db);

      // Act
      return (
        expect(sut.checkDbConnection())
          // Assert
          .rejects.toThrow()
      );  
    });

  });
});
