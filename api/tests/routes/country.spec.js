/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { conn } = require("../../src/db.js");

const agent = session(app);

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("GET /recipes", () => {
    it("should get 200", () => agent.get("/recipes").expect(200));
  });
});
describe("GET /recipes", () => {
  it("should respond with id and correct name", () => {
    return agent.get("/recipes/642085").then((res) => {
      expect(res.body[0].name).to.equal("Easy Roasted Vegetables");
    });
  });
});
describe("GET /recipes", () => {
  it("should respond with id and correct name", () => {
    return agent.get("/recipes/662968").then((res) => {
      expect(res.body[0].name).to.equal("Tempered Spicy Potatoes");
    });
  });
});
