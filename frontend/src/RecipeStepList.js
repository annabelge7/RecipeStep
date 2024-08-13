import React, { useEffect, useState } from "react";
import { useApolloClient, gql, useQuery } from "@apollo/client";
import RecipeStep from "./RecipeStep";
import Delete from "./Delete";
import Update from "./Update";
import Button from "./Button";

const GET_RECIPE_STEPS = gql`
  query AllRecipeSteps($completed: Boolean) {
    recipeSteps(completed: $completed) {
      id
      step
      completed
    }
  }
`;

function RecipeStepList() {
  const [filter, setFilter] = useState(null);
  //copied this directly from Apollo docs
  const { loading, error, data } = useQuery(GET_RECIPE_STEPS, {
    variables: { completed: filter },
    pollInterval: 500,
  }); //muchhh easier way to query with apollo client wow
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <div>
        <Button
          color={"lightgreen"}
          onClick={() => setFilter(null)}
          text={"All"}
          isActive={filter === null}
        />
        <Button
          color={"lightgreen"}
          onClick={() => setFilter(true)}
          text={"Completed"}
          isActive={filter === true}
        />
        <Button
          color={"lightgreen"}
          onClick={() => setFilter(false)}
          text={"Not Completed"}
          isActive={filter === false}
        />
      </div>
      <ol className="list-decimalp-4">
        {data &&
          data.recipeSteps.map((step) => (
            <div key={step.id}>
              <RecipeStep
                id={step.id}
                step={step.step}
                completed={step.completed}
              />
              <div className="flex">
                <Update
                  id={step.id}
                  startStep={step.step}
                  completed={step.completed}
                />
                <Delete id={step.id} />
              </div>
            </div>
          ))}
      </ol>
    </div>
  );
}

export default RecipeStepList;
