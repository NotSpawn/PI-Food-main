const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;
// const food = require("../../food.json");

const getApi = async () => {
  const resp = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?${API_KEY}&addRecipeInformation=true&number=100`
    )
  ).data.results;

  // const resp = food.results;

  const apiInfo = await resp.map((recipe) => {
    return {
      id: recipe.id,
      image: recipe.image,
      name: recipe.title,
      dietTypes: recipe.diets,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      dishTypes: recipe.dishTypes,
      steps: recipe.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
        };
      }),
    };
  });
  return apiInfo;
};

const getDb = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const api = await getApi();
  const db = await getDb();
  const All = api.concat(db);

  return All;
};

module.exports = {
  getApi,
  getDb,
  getAllRecipes,
};
