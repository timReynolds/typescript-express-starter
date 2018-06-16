import { IQueryHandler } from "@timreynolds/cqs";
import IDbStatusRepository from "../repository/IDbStatusRepository";

import dbStatusQueryHandlerBuilder from "./dbStatusQueryHandler";

describe("dbStatusQueryHandler", () => {
  let mockDbStatusRepo: jest.Mocked<IDbStatusRepository>;
  let sut: IQueryHandler<{}, void>;

  beforeEach(() => {
    mockDbStatusRepo = {
      checkDbConnection: jest.fn()
    };

    sut = dbStatusQueryHandlerBuilder({
      dbStatusRepository: mockDbStatusRepo
    });
  });

  test("When repository doesn't throw, handler should not throw", () => {
    // Arrange
    mockDbStatusRepo.checkDbConnection.mockResolvedValue(undefined);

    // Act
    return expect(sut({}))
      // Assert
      .resolves.toBe(undefined);
  });

  test("When repository does throw, handler should throw", () => {
    // Arrange
    mockDbStatusRepo.checkDbConnection.mockRejectedValue(undefined);

    // Act
    return expect(sut({}))
      // Assert
      .rejects.toBe(undefined);
  });
});
