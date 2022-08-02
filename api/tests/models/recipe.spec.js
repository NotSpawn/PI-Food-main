const { Recipe, conn } = require("../../src/db");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Recipe model", async () => {
    it("should contain attributes : id, name , summary , image, healthScore, steps", async () => {
      const recipe = await Recipe.findOne({
        where: { name: "Asado" },
      });
      expect(recipe.dataValues).to.have.own.property("id");
      expect(recipe.dataValues).to.have.own.property("name");
      expect(recipe.dataValues).to.have.own.property("image");
      expect(recipe.dataValues).to.have.own.property("summary");
      expect(recipe.dataValues).to.have.own.property("healthScore");
      expect(recipe.dataValues).to.have.own.property("steps");
    });
    it("property summary must be text", async () => {
      const recipe = await Recipe.findOne({
        where: { name: "Asado" },
      });
      expect(recipe.dataValues.healthScore).to.be.a("number");
    });
  });
});
