import app from "../app";
import request from "supertest";
import logger from "../logger/logger";
import mongoose from "mongoose";

beforeAll(done => {
    process.env.DB = "doetTestDB"
    done();
})

describe("User Tests", () => {
    test("Create User Success", async () => {
        logger.info("Testing create user for success.");
        const res = await request(app).post("/user")
                            .send({
                                "email": "Cali2",
                                "username": "hoohaar"
                            })
        expect(res.statusCode).toBe(200);
        expect(res.body.data.email).toBe("Cali2");
        expect(res.body.data.username).toBe("hoohaar");
    })
})

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
  })