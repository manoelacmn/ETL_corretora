import supertest from "supertest";

import { app } from "./index";

describe("server", () => {
  const request = supertest.agent(app);
  afterAll((done) => {
    app.close(done);
  });
  it("should get /", async () => {
    const res = await request.get("/");
    expect(res.status).toBe(200);
    expect(res.body).toEqual("Welcome!");
  });
});
