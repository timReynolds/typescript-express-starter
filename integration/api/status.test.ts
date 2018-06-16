import * as supertest from "supertest";
import api from "../../src/api";

describe("GET /status/", () => {
  let sut: any;

  beforeAll(() => {
    sut = supertest(api);
  });

  afterAll(async () => {
    await sut.close();
  })

  test("GET /status/health", () => {
    // Arrange
    // Act
    return (
      sut
        .get("/status/health")
        // Assert
        .expect(200)
    );
  });

  test("GET /status/ready", () => {
    // Arrange
    // Act
    return (
      sut
        .get("/status/ready")
        // Assert
        .expect(200)
    );
  });

});
