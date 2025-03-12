const request = require("supertest");
import handler from "../../../pages/api/files/upload";
// import fs from "fs";

describe("File Upload API", () => {
  it("should upload a file and store it in the database", async () => {
    const filePath = "./public/sample.pdf"; // Ensure this exists
    const res = await request(handler)
      .post("/api/files/upload")
      .field("titre", "Test File")
      .field("description", "Test description")
      .field("userId", "test-user-123")
      .attach("file", filePath);

    expect(res.status).toBe(201);
    expect(res.body.file).toHaveProperty("titre", "Test File");
  });

  it("should return error if no file is uploaded", async () => {
    const res = await request(handler).post("/api/files/upload");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "No file uploaded");
  });
});
