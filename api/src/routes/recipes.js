const { Router } = require("express");
const { getAllRecipes } = require("../controllers/recipes");
const router = Router();
const { Recipe, Diet } = require("../db");

router.get("/", async (req, res) => {
  let name = req.query.name;
  let recipesTotal = await getAllRecipes();
  if (name) {
    let recipesName = await recipesTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    recipesName.length
      ? res.status(200).send(recipesName)
      : res.status(404).send("recipe doenst exist");
  } else {
    res.status(200).send(recipesTotal);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const recipesTotal = await getAllRecipes();
  if (id) {
    let recipesId = recipesTotal.filter((recipe) => recipe.id == id);
    recipesId.length
      ? res.status(200).json(recipesId)
      : res.status(404).send("recipe not found");
  }
});

router.post("/", async (req, res, next) => {
  try {
    let {
      name,
      summary,
      healthScore,
      steps,
      dietTypes,
      image,
      readyInMinutes,
      servings,
      createdInDb,
    } = req.body;

    const newRecipe = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      readyInMinutes,
      servings,
      steps,
      createdInDb,
    });

    let dietTypesRecipeDb = await Diet.findAll({
      where: { name: dietTypes },
    });
    newRecipe.addDiet(dietTypesRecipeDb);
    return res.status(200).send("recipe created");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
