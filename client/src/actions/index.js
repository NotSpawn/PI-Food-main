import {
  GET_RECIPES,
  GET_RECIPE_DETAILS,
  DIET_TYPE_FILTER,
  ALPHABETICAL_SORT,
  SCORE_SORT,
  SEARCH_RECIPE,
  GET_DIET_TYPES,
  FILTER_CREATED,
} from "./types";
import axios from "axios";

export function getRecipes() {
  return function (dispatch) {
    axios
      .get(`/recipes`)
      .then((response) => {
        return dispatch({ type: GET_RECIPES, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getRecipesName(payload) {
  return async function (dispatch) {
    try {
      var response = await axios.get(`/recipes?name=${payload}`);
      return dispatch({ type: SEARCH_RECIPE, payload: response.data });
    } catch {
      return alert("recipe not found");
    }
  };
}

export function getRecipeDetails(payload) {
  return async function (dispatch) {
    try {
      var response = await axios.get(`/recipes/${payload}`);
      return dispatch({ type: GET_RECIPE_DETAILS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDietTypes() {
  return async function (dispatch) {
    try {
      var response = await axios.get(`/types`);
      return dispatch({
        type: GET_DIET_TYPES,
        payload: response.data.map((diet) => diet.name),
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addRecipe(payload) {
  console.log(payload);
  return async function () {
    try {
      var response = await axios.post(`/recipes`, payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function dietTypeFilter(payload) {
  return {
    type: DIET_TYPE_FILTER,
    payload,
  };
}

export function alphabeticalSort(payload) {
  return {
    type: ALPHABETICAL_SORT,
    payload,
  };
}

export function scoreSort(payload) {
  return {
    type: SCORE_SORT,
    payload,
  };
}
