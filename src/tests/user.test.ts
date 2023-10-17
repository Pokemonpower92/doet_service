import app from "../app";
import request from "supertest";
import logger from "../logger/logger";
import mongoose from "mongoose";

beforeAll((done) => {
  process.env.DB = "doetTestDB";
  done();
});

const testUser = {
  email: "Cali2",
  username: "hoohaar",
  password: "heehee",
};

let userId = "";

describe("User Tests", () => {
  test("Create User Success", async () => {
    logger.info("Testing create user for success.");
    const res = await request(app).post("/user").send(testUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.email).toBe("Cali2");
    expect(res.body.data.username).toBe("hoohaar");

    userId = res.body.data._id;
  });
  test("Create User Fails With Duplicate User", async () => {
    logger.info("Testing create user for failure with duplicate user.");
    const errorMsg =
      "Failed to register new user with error " +
      "UserExistsError: A user with the given username is already registered";
    const res = await request(app).post("/user").send(testUser);
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe(errorMsg);
  });
  test("Get All Users Success", async () => {
    logger.info("Testing get all users for success.");
    const res = await request(app).get("/user");
    expect(res.statusCode).toBe(200);
  });
  test("Get A User By Id Success", async () => {
    logger.info("Testing get a user by id for success.");
    const res = await request(app).get(`/user/${userId}`);
    expect(res.statusCode).toBe(200);
  });
  test("Delete A User By Id Success", async () => {
    logger.info("Testing delete a user by id for success.");
    const res = await request(app).delete(`/user/${userId}`);
    expect(res.statusCode).toBe(200);
  });
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close().then(() => {
    done();
  });
});
