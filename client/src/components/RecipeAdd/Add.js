import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDietTypes, addRecipe } from "../../actions";
import "./Add.css";

function validate(input) {
  const errors = {};
  if (!input.name) errors.name = "Requires a name";
  if (!input.image) errors.image = "Requires an image";
  if (!input.summary) errors.summary = "Requires a summary";
  if (input.healthScore < 1 || input.healthScore > 100)
    errors.healthScore = "The score must be a number between 1 and 100";
  if (!input.readyInMinutes)
    errors.readyInMinutes = "Requires recipe making time";
  if (!input.servings) errors.servings = "Requires recipe serving";
  if (!input.steps.length) errors.steps = "Complete with recipe steps";
  if (!input.dietTypes.length)
    errors.dietTypes = "You must select at least one diet type";
  return errors;
}

export default function Add() {
  const dispatch = useDispatch();
  const dietTypes = useSelector((state) => state.dietTypes);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    score: "",
    healthScore: "",
    readyInMinutes: "",
    servings: "",
    steps: [],
    dietTypes: [],
  });

  useEffect(() => {
    dispatch(getDietTypes());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setInput((prevInput) => {
      const newInput = {
        ...prevInput,
        [e.target.name]: e.target.value,
      };
      const validations = validate(newInput);
      setErrors(validations);
      return newInput;
    });
  }

  function handleCheckBox(e) {
    let newArray = input.dietTypes;
    let find = newArray.indexOf(e.target.value);

    if (find >= 0) {
      newArray.splice(find, 1);
    } else {
      newArray.push(e.target.value);
    }

    setInput({
      ...input,
      dietTypes: newArray,
    });
    const validations = validate(input);
    setErrors(validations);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.values(errors).length > 0) {
      alert("Please complete the information required");
    } else if (
      input.name === "" &&
      input.image === "" &&
      input.summary === "" &&
      input.healthScore === "" &&
      input.readyInMinutes === "" &&
      input.servings === "" &&
      input.steps === "" &&
      !input.dietTypes.length
    ) {
      alert("Please complete the form");
    } else {
      dispatch(addRecipe(input));
      alert("New recipe added successfully!");
      setInput({
        name: "",
        image: "",
        summary: "",
        healthScore: "",
        readyInMinutes: "",
        servings: "",
        steps: [],
        dietTypes: [],
      });
      history.push("/home");
    }
  }

  return (
    <div className="addRecipe">
      <h1 className="msg">Add your recipe</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form">
          <div className="MainForm">
            <div className="inputName">
              <label className="msgs">Name:</label>
              <input
                className="inputs"
                name="name"
                type="text"
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <span className="errors">{errors.name}</span>}
            </div>

            <div className="inputName">
              <label className="msgs">image:</label>
              <input
                className="inputs"
                name="image"
                type="text"
                value={input.image}
                onChange={(e) => handleChange(e)}
              />
              {errors.image && <span className="errors">{errors.image}</span>}
            </div>

            <div className="inputName">
              <label className="msgs">Summary:</label>
              <textarea
                name="summary"
                type="text"
                rows="4"
                cols="30"
                value={input.summary}
                onChange={(e) => handleChange(e)}
              />
              {errors.summary && (
                <span className="errors">{errors.summary}</span>
              )}
            </div>
            <div className="inputName">
              <label className="msgs">Health Score:</label>
              <input
                name="healthScore"
                type="number"
                value={input.healthScore}
                onChange={(e) => handleChange(e)}
              />
              {errors.healthScore && (
                <span className="errors">{errors.healthScore}</span>
              )}
            </div>
            <div className="inputName">
              <label className="msgs">Ready In:</label>
              <input
                name="readyInMinutes"
                type="number"
                value={input.readyInMinutes}
                onChange={(e) => handleChange(e)}
              />
              {errors.readyInMinutes && (
                <span className="errors">{errors.readyInMinutes}</span>
              )}
            </div>
            <div className="inputName">
              <label className="msgs">Servings:</label>
              <input
                name="servings"
                type="number"
                value={input.servings}
                onChange={(e) => handleChange(e)}
              />
              {errors.servings && (
                <span className="errors">{errors.servings}</span>
              )}
            </div>
            <div className="inputName">
              <label className="msgs">Steps:</label>
              <textarea
                name="steps"
                type="text"
                rows="4"
                cols="40"
                value={input.steps}
                onChange={(e) => handleChange(e)}
              />
              {errors.steps && <span className="errors">{errors.steps}</span>}
            </div>
          </div>
          <div className="checkBox">
            <label className="msgs">Diet Types:</label>
            {dietTypes.map((d) => {
              return (
                <div key={d} className="checks">
                  <label className="Types">{d}</label>
                  <input
                    className="checks"
                    type="checkbox"
                    name={d}
                    value={d}
                    selected={input.dietTypes.includes(d)}
                    onChange={(e) => handleCheckBox(e)}
                  />
                </div>
              );
            })}
            {errors.dietTypes && (
              <span className="errors">{errors.dietTypes}</span>
            )}
          </div>
        </div>
        <button className="submitButton" type="submit">
          Submit Recipe
        </button>
        <Link to="/home">
          <button className="goBackButton">Go back</button>
        </Link>
      </form>
    </div>
  );
}
