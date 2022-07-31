import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

let prevId = 1;

function Card(recipes) {
  const {
    image,
    name,
    dietTypes,
    healthScore,
    diets,
    readyInMinutes,
    servings,
    id,
  } = recipes;
  return (
    <div>
      <div className="container">
        <img src={image} alt="not found" />
        <div className="container__text">
          <h1>{name} </h1>
          <div>
            {dietTypes ? (
              <div className="dietcointainer">
                {dietTypes.map((e) => (
                  <h2 className="diets" key={prevId++}>
                    {e}
                  </h2>
                ))}
              </div>
            ) : (
              <div className="dietcointainer">
                {diets?.map((t) => (
                  <h2 className="diets" key={prevId++}>
                    {t.name}
                  </h2>
                ))}
              </div>
            )}
          </div>
          <div className="container__text__timing">
            <div className="container__text__timing_time">
              <h2>Ready In</h2>
              <p>{readyInMinutes} Min</p>
            </div>
            <div className="container__text__timing_time">
              <h2>Health Score</h2>
              <p>{healthScore} Pts</p>
            </div>
            <div className="container__text__timing_time">
              <h2>Servings</h2>
              <p>{servings} Plate/s</p>
            </div>
          </div>
          <Link className="linkRecetas" to={`home/${id}`}>
            <button className="btn">view recipe</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
