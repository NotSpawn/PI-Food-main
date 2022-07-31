import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../../actions";
import { Link } from "react-router-dom";
import "./Details.css";

export default function Details(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getRecipeDetails(id));
  }, [dispatch, id]);

  const detailsstate = useSelector((state) => state.recipeDetails);

  console.log(detailsstate);

  let prevId = 1;

  return (
    <div>
      {detailsstate.length > 0 ? (
        <div className="container-inline">
          <div className="inline">
            <img src={detailsstate[0].image} alt="not found" />
            <div className="container__text">
              <h1>{detailsstate[0].name} </h1>
              <div>
                {detailsstate[0].dietTypes ? (
                  <div className="dietcointainer">
                    {detailsstate[0].dietTypes.map((e) => (
                      <h2 className="diets" key={prevId++}>
                        {e}
                      </h2>
                    ))}
                  </div>
                ) : (
                  <div className="dietcointainer">
                    {detailsstate[0].diets?.map((t) => (
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
                  <p>{detailsstate[0].readyInMinutes} Min</p>
                </div>
                <div className="container__text__timing_time">
                  <h2>Health Score</h2>
                  <p>{detailsstate[0].healthScore} Pts</p>
                </div>
                <div className="container__text__timing_time">
                  <h2>Servings</h2>
                  <p>{detailsstate[0].servings} Plate/s</p>
                </div>
              </div>
            </div>
          </div>
          <div className="info">
            <ul className="steps">
              <p>Steps :</p>
              {Array.isArray(detailsstate[0].steps) ? (
                detailsstate[0].steps.map((e) => {
                  return (
                    <li className="lista" key={e.number}>
                      {e.step}
                    </li>
                  );
                })
              ) : (
                <li className="lista">{detailsstate[0].steps}</li>
              )}
            </ul>
            <div className="summary">
              <p>Summary :</p>
              {detailsstate[0].summary?.replace(/<[^>]*>/g, "")}
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
      <Link to="/home">
        <button className="backButton">Go back to recipes</button>
      </Link>
    </div>
  );
}
