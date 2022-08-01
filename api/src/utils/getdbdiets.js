const { Diet } = require("../db");

const addTypeOfDiets = async () => {
  if (!(await Diet.findAll()).length) {
    const TypesOfDiets = [
      { name: "vegetarian" },
      { name: "ketogenic" },
      { name: "low fodmap" },
      { name: "lacto vegetarian" },
      { name: "ovo vegetarian" },
      { name: "lacto ovo vegetarian" },
      { name: "vegan" },
      { name: "pescetarian" },
      { name: "paleolithic" },
      { name: "dairy free" },
      { name: "primal" },
      { name: "whole 30" },
      { name: "gluten free" },
    ];

    const listaDietas = await Diet.bulkCreate(TypesOfDiets, {
      returning: true,
    });
    return listaDietas;
  } else {
    console.log("ya tengo dietas");
  }
};

module.exports = addTypeOfDiets;
